import mongoose from "mongoose";
import Restaurant from "./Restaurants";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You can not create order without user"],
  },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  address: { type: String },

  comment: { type: String },

  rating: { type: Number, default: 0 },
  rated: { type: Boolean, default: false },
});

//check if order record rating is more than 0
OrderSchema.pre("save", async function (next) {
  if (this.rating !== 0 && !this.rated) {
    this.rated = true;
  }
  next();
});

// add averageRating after order has saved
OrderSchema.post("save", async function () {
  if (this.rated) {
    const restaurantId = this.restaurantId;
    const averageRating = await Order.aggregate([
      {
        $match: {
          restaurantId,
          rated: true,
        },
      },
      { $unwind: "$rating" },
      {
        $group: {
          _id: null, // Group all documents together
          averageRating: { $avg: "$rating" },
        },
      },
    ]).then((result) => {
      console.log({ result });

      //if there
      if (result.length > 0) {
        return result[0].averageRating;
      } else {
        return this.rating;
      }
    });

    await Restaurant.findByIdAndUpdate(restaurantId, { averageRating });
  }
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;

// OrderSchema.pre("save", async function (next) {
//   try {
//     const restaurantId = this.restaurantId;
//     // const newRating = this.ratings[this.ratings.length - 1].rating; // Get the new rating

//     // console.log({ restaurantId, newRating });
//     // Calculate the average rating for the restaurant
//     const averageRating = await Order.aggregate([
//       { $match: { restaurantId } },
//       { $unwind: "$ratings" },
//       {
//         $group: {
//           _id: "$restaurantId",
//           averageRating: { $avg: "$ratings.rating" },
//         },
//       },
//     ]).then((result) => {
//       console.log({ result });
//       return result[0].averageRating;
//     });

//     // Update the restaurant's averageRating
//     await Restaurant.findByIdAndUpdate(
//       restaurantId,
//       { averageRating },
//       { new: true }
//     );

//     next(); // Proceed with saving the order
//   } catch (error) {
//     console.error("Error updating average rating:", error);
//     next(error as Error); // Pass the error to Mongoose
//   }
// });
