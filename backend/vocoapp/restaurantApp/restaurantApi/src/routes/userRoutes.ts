import express from "express";
import usersController from "../controllers/usersController";

const userRouter = express.Router();
userRouter.route("/").post(usersController.createNewUser);

export default userRouter;
