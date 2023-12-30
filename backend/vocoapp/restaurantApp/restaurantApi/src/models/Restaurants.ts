import mongoose from "mongoose";
import Order from "./Orders";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  description: { type: String },
  logo: { type: String },
  address: {
    type: String,
    // required: true,
  },
  location: {
    type: {
      type: String, // Ensure GeoJSON string format
      enum: ["Point"], // Restrict to Point type
      required: true,
    },
    coordinates: {
      type: [Number], // Array of longitude and latitude
      required: true,
    },
  },

  // if restaurant has more then one branch then this list length ? is > 1  : otherwise == 1
  branches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  menu: [
    {
      foodName: { type: String },
      foodPrice: { type: Number },
      foodPicture: { type: String },
    },
  ],
  categories: [String],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  averageRating: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
});

RestaurantSchema.index({ location: "2dsphere" });

// RestaurantSchema.virtual("averageRating").get(async function () {
//   const ratedOrders = await Order.find({
//     restaurantId: String(this._id),
//     rated: true,
//   });

//   console.log({ ratedOrders });

//   // const ratedOrders = this.orders.filter(order => order.rated);
//   if (ratedOrders.length > 0) {
//     const totalRating = ratedOrders.reduce(
//       (sum, order) => sum + order.rating,
//       0
//     );
//     return totalRating / ratedOrders.length;
//   } else {
//     return 0; // Or a default value you prefer
//   }
// });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;

// comments: [
//   {
//     comment: { type: String },
//   },
// ],
// ratings: [
//   {
//     rating: { type: Number },
//   },
// ],
