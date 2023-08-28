import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import product from "./routes/productRoute.js";
import OrderRoute from "./routes/orderRoute.js";
import dotenv from 'dotenv'
import errorMiddleware from "./middlewares/error.js";

dotenv.config({ path: './config/config.env' })

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", product);
app.use("/api/v1", userRoute);
app.use("/api/v1", OrderRoute);

// Middleware for erros
app.use(errorMiddleware);

export default app;
