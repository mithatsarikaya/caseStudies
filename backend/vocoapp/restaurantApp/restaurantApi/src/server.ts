import express from "express";
import connectDB from "./config/dbConn";
import "dotenv/config";
import restaurantRouter from "./routes/restaurantRoutes";
import orderRouter from "./routes/orderRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

app.listen(5000, () => {
  console.log("server is listening now");
});

connectDB();

//with this middleware we can receive and parse json data
app.use(express.json());

app.use("/restaurants", restaurantRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);

// app.get("/", (req, res) => {
//   console.log("object");
//   res.end();
// });
