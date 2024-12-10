import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = "681785526541859";
const API_SECRET = "RTTflP87TJvklyXyk0kZWG8QDoA";

cloudinary.config({
  cloud_name: "ds3uh3v2t",
  api_key: process.env.CLOUDINARY_API_KEY || API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || API_SECRET,
});

export default cloudinary;
