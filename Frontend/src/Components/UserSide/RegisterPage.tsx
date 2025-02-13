// import "tailwindcss/tailwind.css";
import { FcGoogle } from "react-icons/fc";
import newlogo from "../Images/newslogo.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import logoWeb from "../Animations/Animation - 1724244656671.json";
import { API_USER_URL } from "../Constants/Constants";
import { FaSpinner } from "react-icons/fa";
import { googleSignIn } from "../../Services/User_API/Homepageapis";

const Registerpage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .test(
        "is-not-only-spaces",
        "Name cannot be only spaces",
        (value) => !!value && value.trim().length > 0
      ),
    
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { name, email, password } = values;
      setLoading(true)
    try {
      const response = await axios.post(
        `${API_USER_URL}/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "OTP Send Successfully") {
        let email = response.data.useremail;
        const secretKey = "your-secret-key-crypto";
        const encryptedEmail = CryptoJS.AES.encrypt(
          email,
          secretKey
        ).toString();
        navigate("/verify-otp", { state: { email: encryptedEmail } });
      }else{
        toast.error("OTP Send Failed");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("Unknown error occurred");
      }
      console.error("Error verifying OTP:", error);


    }finally{
     setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-black border-b border-gray-700 h-[60px] flex items-center">
        <div className="px-3 sm:px-4 py-2">
          <div className="flex items-center space-x-2">
            <Lottie
              animationData={logoWeb}
              className="w-8 sm:w-18 md:w-24 lg:w-32"
              style={{ maxWidth: "100px", height: "auto" }}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold font-['Viaoda_Libre']">
              Clear View
            </h1>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-16">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-black text-white flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-8">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-['junge'] leading-relaxed">
                Your trusted source for
                <br />
                the latest news and insights
              </h2>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={googleSignIn}
              className="w-full flex items-center justify-center bg-white hover:bg-gray-50 text-black py-3 px-4 rounded-lg text-base sm:text-lg font-semibold space-x-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mb-6"
            >
              <FcGoogle className="text-xl sm:text-2xl" />
              <span className="font-['Roboto']">Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-black text-sm text-gray-400 font-['Roboto']">
                  or
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full py-3 px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg font-['Roboto'] hover:border-purple-400 transition-colors duration-300"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full py-3 px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg font-['Roboto'] hover:border-purple-400 transition-colors duration-300"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full py-3 px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg font-['Roboto'] hover:border-purple-400 transition-colors duration-300"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <Field
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm your password"
                      className="w-full py-3 px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg font-['Roboto'] hover:border-purple-400 transition-colors duration-300"
                    />
                    <ErrorMessage
                      name="confirmpassword"
                      component="div"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white py-3 rounded-lg text-base sm:text-lg font-['Roboto'] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 mt-6"
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <FaSpinner className="animate-spin text-xl" />
                      </div>
                    ) : (
                      "Sign up"
                    )}
                  </button>

                  {/* Links */}
                  <div className="text-center space-y-2 mt-6 font-['Roboto']">
                    <Link
                      to="/forgetpass"
                      className="block text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      Forgot password?
                    </Link>
                    <p className="text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex   flex-1 bg-gradient-to-br from-purple-800 to-purple-600 justify-center items-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-lg xl:max-w-xl p-4">
            <img
              src={newlogo}
              alt="News illustration"
              className="w-full h-auto rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
