import User from "../models/Users";
import { Request, Response } from "express";

const createNewUser = async (req: Request, res: Response) => {
  const { username, password, gender } = req.body;

  console.log(req.body);

  const user = await User.create({
    username,
    password,
    gender,
  });

  if (user) {
    res.status(201).json({ message: `${user.username} created` });
  } else {
    res.status(400).json({ message: "user could not created" });
  }
};

export default { createNewUser };
