import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  convertISOTo12HourFormat,
  convertTo12HourFormat,
} from "../helpers/helperFunctions";
import useBookFlight from "../hooks/useBookFlight";

const Flight = ({ flight }) => {
  // Destructing flight for reaching inside the flight data
  const {
    scheduleDate,
    scheduleTime,
    actualLandingTime,
    route,
    actualOffBlockTime,
    flightName,
    flightNumber,
    aircraftType,
  } = flight;

  // Getting states and func from useBookFlight custom hook
  const { bookFlights, error, loading } = useBookFlight();

  // Sending helper functions folder to clearing this ui
  const departureTime = convertTo12HourFormat(scheduleTime);
  const arrivalTime = convertISOTo12HourFormat(actualLandingTime);

  // Sending data to bookFlights func
  const handleBookFlight = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (scheduleDate < today) {
      toast.error("Not allow booking this date!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    await bookFlights(scheduleDate, scheduleTime, flightName, flightNumber);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative flex flex-col  gap-4 p-2 md:p-6 bg-white rounded-xl rounded-bl-none"
    >
      <p className="font-semibold text-sm">Flight Name : {flightName}</p>
      <p className="font-semibold text-sm">Flight Number : {flightNumber}</p>
      <p className="font-semibold text-sm">Schedule Date : {scheduleDate}</p>
      <div className="flex justify-between gap-2 xl:gap-10 items-center">
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center">
            <FaPlaneDeparture />
            <p className="text-xs capitalize">Departure</p>
          </div>
          <div>
            <p className="text-xs md:text-base font-semibold uppercase">
              {departureTime}
            </p>
          </div>

          {/* We havent an departure airport becaming from Api */}

          {/* <div>
            <p className="capitalize text-xs">
              airport : <span className="uppercase">mxp</span>
            </p>
          </div> */}
        </div>
        <div className="w-16 h-0.5 bg-black"></div>
        <div className="flex flex-col justify-center items-center">
          <p className="capitalize text-center text-xs font-bold">
            aircraft type: {aircraftType && aircraftType.iataMain}
          </p>
          <IoIosAirplane className="text-violet-900" />

          <p className="text-xs text-center">
            {route &&
              route.destinations.length +
                `${
                  route && route.destinations.length === 1 ? " stop" : " stops"
                }`}{" "}
          </p>
        </div>
        <div className="w-16 h-0.5 bg-black"></div>
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center">
            <FaPlaneArrival />
            <p className="text-xs capitalize">arrival</p>
          </div>
          <div>
            <p className="text-xs md:text-base font-semibold  uppercase">
              {actualOffBlockTime
                ? "Unknown"
                : actualLandingTime
                ? arrivalTime
                : "Unknown"}
            </p>
          </div>

          {/* We havent an arrival airport becaming from Api */}

          {/* <div>
            <p className="capitalize text-xs">
              airport : <span className="uppercase">mad</span>
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="capitalize font-extrabold text-violet-900 text-sm ">
          for pricing check the details
        </p>
        <p className="capitalize text-xs">round trip</p>
      </div>
      <div className="absolute -bottom-10 left-0 bg-violet-200 h-8   text-center rounded-md rounded-t-none ">
        <Link className="text-violet-900 underline text-xs p-4 capitalize  ">
          check the details
        </Link>
      </div>
      <Button
        className="absolute right-0 bottom-0  rounded-none rounded-br-xl rounded-tl-xl h-12 bg-violet-900 capitalize text-xs  "
        onClick={handleBookFlight}
        type="button"
      >
        book flight
      </Button>
    </motion.div>
  );
};

export default Flight;
