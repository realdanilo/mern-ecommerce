import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js"
import { notFound, errorHandler } from "./middleware/error.js";

// always at the top dotenv
dotenv.config();
const app = express();
connectDB();
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes)

// middleware for Errors
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode`);
  console.log(`server running on port ${port}`);
});
