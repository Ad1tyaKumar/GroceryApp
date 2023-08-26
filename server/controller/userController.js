import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { User } from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(200).json({
      user: null,
      isAuthenticated: false,
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(200).json({
      user: null,
      isAuthenticated: false,
    });
  }

  res.status(200).json({
    user,
    isAuthenticated: true,
  });
});

export const checkUser = catchAsyncErrors(async (req, res, next) => {
  const { phoneNo } = req.body;
  const user = await User.findOne({ phoneNo });
  const isUser = user ? true : false;
  res.status(200).json({ isUser });
});

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phoneNo } = req.body;

  //Creating user in DB
  const user = await User.create({
    phoneNo,
    email,
    name,
    cart: [],
    shippingAddress: [],
  });
  sendToken(user, 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { phoneNo } = req.body;
  const user = await User.findOne({ phoneNo });

  sendToken(user, 200, res);
});

//logout user
export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

//adding to cart
export const addToCart = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next(new ErrorHandler(`LOGIN FIRST!`, 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { cartItems } = req.body;
  const user = await User.findByIdAndUpdate(
    decoded.id,
    { cart: cartItems },
    { new: true }
  );
  // console.log(user);
  if (!user) {
    next(new ErrorHandler(`User Not Found`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//get all cart items
export const getAllCart = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next(new ErrorHandler(`LOGIN FIRST!`, 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  res.status(200).json({
    cart: user.cart,
  });
});

//update user info
export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next(new ErrorHandler(`Login First`, 400));
  }
  const newUserData = {
    name: req.body.name,
    phoneNo: req.body.phoneNo,
  };
  if (req.body.email !== "") {
    newUserData.email = req.body.email;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(decoded.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//ADMIN

//getAll users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  // console.log(users);
  res.status(200).json({
    success: true,
    users,
  });
});

//get One user
export const getOneUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    next(new ErrorHandler(`User not found!`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user

export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!user) {
    next(new ErrorHandler(`User Not Found`, 404));
  }
  res.status(200).json({
    success: true,
  });
});

//delete User
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    next(new ErrorHandler(`User not found`, 404));
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

export const savePin = catchAsyncErrors((req, res, next) => {
  const { pinCode } = req.body;
  const pin = jwt.sign({ pin: pinCode }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  
  res.status(200).json({
    success: true,
    pinCode,
    pin,
  });
});

export const getPin = catchAsyncErrors((req, res, next) => {
  const { pin } = req.body;
  // console.log(pin);
  if (!pin) {
    return res.status(200).json({
      success: false,
      pinCode: 0,
    });
  }
  const decoded = jwt.verify(pin, process.env.JWT_SECRET);
  res.status(200).json({
    success: true,
    pinCode: decoded.pin,
  });
});

export const saveShippingInfo = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, token } = req.body;
  if (!token) {
    next(new ErrorHandler(`Login First!`, 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByIdAndUpdate(decoded.id, {
    shippingAddress: shippingInfo,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
