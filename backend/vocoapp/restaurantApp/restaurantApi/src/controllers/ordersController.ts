import Order from "../models/Orders";
import { Request, Response } from "express";

const createNewOrder = async (req: Request, res: Response) => {
  const { userId, restaurantId, rating, comment } = req.body;

  console.log(req.body);

  const order = await Order.create({
    userId,
    restaurantId,
    rating,
    comment,
  });

  if (order) {
    res.status(201).json({ message: `${order._id} created` });
  } else {
    res.status(400).json({ message: "order could not created" });
  }
};

export default { createNewOrder };
