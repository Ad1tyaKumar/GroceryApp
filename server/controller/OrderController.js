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

// get Single Order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
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

// Get  All Orders --Admin
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new ErrorHandler("No Orders Found", 404));
  }

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status --Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("Order Not Found With This Id"));
  }

  if (orders.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have alredy delivered this product", 400)
    );
  }
  if (req.body.status === "Shipped") {
    orders.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  orders.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    orders.deliveredAt = Date.now();
  }

  orders.orderStatus = req.body.status;

  await orders.save();

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

// Delete Orders --Admin
export const deleteOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("Order Not Found With This Id"));
  }

  await orders.deleteOne();

  res.status(200).json({
    success: true,
    orders,
  });
});
