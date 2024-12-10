import mongoose from "mongoose";
const databaseURL: string ="mongodb+srv://4270abhishek:LUbAMBxA0San36uw@cluster0.oylin.mongodb.net/newsapp";

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
  } catch (error) {
    console.log("Connect error:", error);
  }
};

export default connectDB;
