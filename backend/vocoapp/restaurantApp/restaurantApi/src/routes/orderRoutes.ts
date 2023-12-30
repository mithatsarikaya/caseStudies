import express from "express";
import ordersController from "../controllers/ordersController";

const orderRouter = express.Router();
orderRouter.route("/").post(ordersController.createNewOrder);

export default orderRouter;
