import express from "express";
import dotenv from "dotenv";

import flightRouter from "./routes/flight.routes.js";
import connectDb from "./database/connectDb.js";

// For communicate this folder and .env folder
dotenv.config();

// We create constants
const app = express();
const PORT = process.env.PORT || 5007;

// Middlewares , we gonna use the json , and our path
app.use(express.json());
app.use("/api/flights", flightRouter);

// Listening PORT coming from .env folder , and calling connecting database func
app.listen(PORT, () => {
  connectDb();
  console.log(`Server listening port : ${PORT}`);
});
