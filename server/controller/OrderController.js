import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../model/orderModel.js";
import { Product } from "../model/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

// Create New Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {

  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body.order;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


// Get Logged In Users Orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const orders = await Order.find({ user: decoded.id });

  if (!orders) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});


async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;

  await product.save();
}

