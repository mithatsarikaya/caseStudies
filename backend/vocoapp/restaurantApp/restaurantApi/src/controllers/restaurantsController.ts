import Restaurant from "../models/Restaurants";
import { Request, Response } from "express";

const createNewRestaurant = async (req: Request, res: Response) => {
  const { name, description, location } = req.body;

  console.log(req.body);

  const restaurant = await Restaurant.create({
    name,
    description,
    location,
  });

  if (restaurant) {
    res.status(201).json({ message: `${restaurant.name} created` });
  } else {
    res.status(400).json({ message: "Restaurant could not created" });
  }
};

const getAllRestaurants = async (req: Request, res: Response) => {
  // Get all restaurants from MongoDB. if no methods will be used then use lean()

  let { page = 1, limit = 2 } = req.query;
  limit = Number(limit);
  page = Number(page);
  try {
    const restaurants = await Restaurant.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ averageRating: -1 })
      .lean();

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(404).json({ message: "Restaurants could not found" });
  }
};

const findFirstFiveClosestRestaurantsByGivenCoordinates = async (
  req: Request,
  res: Response
) => {
  try {
    const { latitude, longitude } = req.body;

    const restaurants = await Restaurant.find({
      description: { $regex: /lahmacun/i },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude],
          },
        },
      },
    })
      .limit(5)
      .lean();

    console.log(restaurants);
    res.json(restaurants);
  } catch (err) {
    console.log(err);
    throw new Error("Error");
  }
};

export {
  getAllRestaurants,
  createNewRestaurant,
  findFirstFiveClosestRestaurantsByGivenCoordinates,
};
