import express from "express";

import {
  getBetweenTwoDatesFlights,
  bookFlights,
  getBookFlights,
} from "../controllers/flight.controllers.js";

const router = express.Router();

// Create routes for which http request gonna use which controller func
router.post("/between-flights", getBetweenTwoDatesFlights);
router.route("/book-flights").post(bookFlights).get(getBookFlights);

export default router;
