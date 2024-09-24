import fetch from "node-fetch";

import { FlightModel } from "../model/flight.model.js";

// Getting flights func between two dates
const getBetweenTwoDatesFlights = async (req, res) => {
  const { departure, arrival } = req.body;

  if (!departure || !arrival) {
    return res.status(400).json({
      success: false,
      message: "Please choose departure and arrival date!",
    });
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleDate&fromScheduleDate=${departure}&toScheduleDate=${arrival}`,
      {
        headers: {
          Accept: "application/json",
          app_id: process.env.API_APP_ID,
          app_key: process.env.API_APP_KEY,
          ResourceVersion: "v4",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data.flights);
    } else {
      return res.status(response.status).json({
        success: false,
        message: "Error fetching flights",
      });
    }
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create booking flights func
const bookFlights = async (req, res) => {
  const { scheduleDate, scheduleTime, flightName, flightNumber } = req.body;

  if (!scheduleDate || !scheduleTime || !flightName || !flightNumber) {
    return res.status(500).json({
      success: false,
      message: "Error booking flights",
    });
  }

  try {
    const savedFlight = await FlightModel.create({
      scheduleDate,
      scheduleTime,
      flightName,
      flightNumber,
    });

    res.status(201).json(savedFlight);
  } catch (error) {
    console.error("Error booking flights:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Getting booking flights func
const getBookFlights = async (req, res) => {
  const sort = req.query.sort || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;

  try {
    const myBookedFlight = await FlightModel.find().sort({
      [sort]: order,
    });
    res.status(200).json(myBookedFlight);
  } catch (error) {
    console.error("Error getting booking flights:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Exporting all func
export { getBetweenTwoDatesFlights, bookFlights, getBookFlights };
