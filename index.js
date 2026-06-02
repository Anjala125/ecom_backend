import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ordersRoutes from "./routes/orderRoutes.js";
import connectDB from "./config/dbConnection.js";
import productRoutes from "./routes/productRoutes.js";


import authRoutes from "./routes/authenticationRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});