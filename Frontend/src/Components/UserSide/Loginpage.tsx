
import { FcGoogle } from "react-icons/fc";
import newlogo from "../Images/newslogo.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import logoWeb from "../Animations/Animation - 1724244656671.json";
import {setUserAccessTocken,setUserRefreshtocken} from "../../Redux-store/redux-slice";
import Lottie from "lottie-react";
import { FaSpinner } from "react-icons/fa";
import { googleSignIn, loginPage } from "../../Services/User_API/Homepageapis";

   interface LoginFormValues {
  email: string;
  password: string;
}


const Loginpage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
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
  });






  const handlesubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const response = await loginPage(values);
      if (response.success) {
        toast.success("Login successfully");
        dispatch(setUserAccessTocken(response.Acesstoc));
        dispatch(setUserRefreshtocken(response.Refreshtoc));
        navigate("/homepage");
      } else {
        toast.error("User Login Failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("Unknown error occurred");
      }
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navbar---------------------------------------------------------------------------------------------------------------------- */}

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

      {/* Navbar---------------------------------------------------------------------------------------------------------------------- */}

      <div className="flex flex-col min-h-screen pt-16 bg-black">
        {/* <div className="block  md:hidden bg-gradient-to-br from-purple-800 to-purple-600 p-4 flex-shrink-0">
          <div className="max-w-[200px] mx-auto">
            <img
              src={newlogo || "/placeholder.svg"}
              alt="News illustration"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div> */}

        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
          {/* Login Form Section */}
          <div className="flex-1 bg-black text-white flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-4 md:py-8">
            <div className="max-w-md mx-auto w-full space-y-4 md:space-y-6">
              {/* Header */}
              <div className="text-center mb-4 md:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-['junge'] leading-relaxed">
                  Your trusted source for
                  <br />
                  the latest news and insights
                </h2>
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={googleSignIn}
                className="w-full flex items-center justify-center bg-white hover:bg-gray-50 text-black py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold space-x-2 sm:space-x-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <FcGoogle className="text-xl sm:text-2xl" />
                <span className="font-['Roboto']">Sign in with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-black text-sm text-gray-400 font-['Roboto']">
                    or
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handlesubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-3 sm:space-y-4">
                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm font-['Roboto'] hover:border-purple-400 transition-colors duration-300 text-white"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-red-500 text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 border border-gray-700 bg-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm font-['Roboto'] hover:border-purple-400 transition-colors duration-300 text-white"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-1 text-red-500 text-xs sm:text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-['Roboto'] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 mt-2"
                    >
                      {loading ? (
                        <div className="flex justify-center items-center">
                          <FaSpinner className="animate-spin text-xl" />
                        </div>
                      ) : (
                        "Log in"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Links */}
              <div className="text-center space-y-2 pt-2 font-['Roboto']">
                <Link
                  to="/forgetpass"
                  className="block text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300"
                >
                  Forgot password?
                </Link>
                <p className="text-xs sm:text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Image Section */}
          <div className="hidden sm:hidden md:flex flex-1 bg-gradient-to-br from-purple-800 to-purple-600 justify-center items-center p-6 lg:p-12">
            <div className="w-full max-w-lg xl:max-w-xl">
              <img
                src={newlogo || "/placeholder.svg"}
                alt="News illustration"
                className="w-full h-auto rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
