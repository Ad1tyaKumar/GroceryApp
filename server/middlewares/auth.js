import { User } from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".././config/config.env" });
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
});

