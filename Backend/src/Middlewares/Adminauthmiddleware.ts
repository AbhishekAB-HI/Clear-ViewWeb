import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserSchemadata from "../model/userModel";


dotenv.config();

const ADMIN_TOKEN_PRIVATE = "key_for_adminaccess";

const AuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.ADMIN_TOKEN_PRIVATE_KEY || ADMIN_TOKEN_PRIVATE
    ) as any; ;
    const userdata = await UserSchemadata.findById(decoded.id);
    if (!userdata) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userdata.isActive) {
      return res.status(403).json({
        code: "ACCOUNT_INACTIVE",
        message: "Forbidden: Account is not active",
      });
    }
    (req as any).userdata = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Token invalid" });
  }
};

export default AuthenticationMiddleware;
