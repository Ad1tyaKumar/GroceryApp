import express from "express";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controller/OrderController.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticated, newOrder); // add new order

router
  .route("/order/:id")
  .post(isAuthenticated, authorizeRoles("admin"), getSingleOrder); //get order by id

router.route("/orders/me").post(isAuthenticated, myOrders); //get order of logged in user

router
  .route("/admin/orders/getAll")
  .post(isAuthenticated, authorizeRoles("admin"), allOrders); //get all orders

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrders); //update and delete order

// router.route("/admin/orders/delete").delete(authorizeRoles, isAuthenticated), //delete order
//   deleteOrders;

export default router;
