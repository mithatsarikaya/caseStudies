import express from "express";
import {
  getAllRestaurants,
  createNewRestaurant,
  findFirstFiveClosestRestaurantsByGivenCoordinates,
} from "../controllers/restaurantsController";

const restaurantRouter = express.Router();
restaurantRouter.route("/").post(createNewRestaurant).get(getAllRestaurants);

restaurantRouter
  .route("/findNearest")
  .post(findFirstFiveClosestRestaurantsByGivenCoordinates);

export default restaurantRouter;
