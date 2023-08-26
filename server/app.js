import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import product from "./routes/productRoute.js";
import OrderRoute from "./routes/orderRoute.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middlewares/error.js";

dotenv.config({ path: './config/config.env' })

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", userRoute);
app.use("/api/v1", OrderRoute);

// Middleware for erros
app.use(errorMiddleware);

export default app;
