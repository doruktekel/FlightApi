import mongoose from "mongoose";

// Creating and exporting flight schema and flight model with mongoose packages
const FlightSchema = new mongoose.Schema(
  {
    scheduleDate: String,
    scheduleTime: String,
    flightName: String,
    flightNumber: Number,
  },
  {
    timestamps: true,
  }
);

export const FlightModel = mongoose.model("flight", FlightSchema);
