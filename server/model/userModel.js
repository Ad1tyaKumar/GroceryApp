import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  phoneNo: {
    type: Number,
    required: [true, "Please enter your Phone Number"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  role: {
    type: String,
    default: "user",
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    phoneNo: {
      type: Number,
    },
    state: {
      type: String,
    },
  },
});

userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

//Generating JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
