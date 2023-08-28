import express from "express";
import {
  addToCart,
  checkUser,
  getAllCart,
  getPin,
  getUser,
  login,
  logout,
  register,
  savePin,
  saveShippingInfo,
  updateUserInfo,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.route("/checkUser").post(checkUser);
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/user").post(getUser).patch(updateUserInfo);
userRouter.route("/user/save/pincode").post(savePin);
userRouter.route('/user/pincode').post(getPin)
userRouter.route("/cart").post(isAuthenticated, addToCart);
userRouter.route("/cart/all").post(isAuthenticated, getAllCart);
userRouter.route("/address/save").post(saveShippingInfo);
export default userRouter;
