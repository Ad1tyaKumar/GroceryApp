import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  myOrders,
  newOrder,
} from "../controller/OrderController.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticated, newOrder); // add new order


router.route("/orders/me").post(isAuthenticated, myOrders); //get order of logged in user


export default router;
