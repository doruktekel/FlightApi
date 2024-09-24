import {
  Button,
  Datepicker,
  Label,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import { ImAirplane } from "react-icons/im";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useGetBetweenTwoDates from "../hooks/useGetBetweenTwoDates";
import { differenceDays, formatDate } from "../helpers/helperFunctions";
import Flight from "./Flight";
import loadingGif from "../assets/loadingPlane.gif";

const FlightContainer = () => {
  // Getting states and func from useGetBetweenTwoDates custom hook
  const { getBetweenTwoDates, betweenFlightList, loading } =
    useGetBetweenTwoDates();
  const [flights, setFlights] = useState([]);
  const [oneWay, setOneWay] = useState(false);
  const [sortOption, setSortOption] = useState("Earliest");
  const [stopOption, setStopOption] = useState("OneStop");

  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  // Setting flights every page loading and betweenFlightList change
  useEffect(() => {
    if (betweenFlightList) {
      setFlights(betweenFlightList);
    }
  }, [betweenFlightList]);

  // Sorting flight func activate every getting flights and changing sorting option
  useEffect(() => {
    if (betweenFlightList) {
      handleSortFlights(betweenFlightList);
    }
  }, [betweenFlightList, sortOption, stopOption]);

  // When form is submitting, handleSubmit func will work
  const handleSubmit = async (e) => {
    // Prevent defaulting web page acts
    e.preventDefault();

    // If departureDate or arrivalDate is empty, send warning to client with toast
    if (!departureDate || !arrivalDate) {
      return toast.warn("Please enter the flight date range", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // If departureDate is later than arrivalDate, send warning to client with toast
    const departureDateForm = new Date(departureDate);
    const arrivalDateForm = new Date(arrivalDate);
    if (departureDateForm > arrivalDateForm) {
      return toast.warn(
        "Please make sure that the arrival date is later than the departure date.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    // If the distance between departureDate and arrivalDate is more than 3 days, send warning to client with toast
    const diffDays = differenceDays(departureDate, arrivalDate);
    if (diffDays > 3) {
      return toast.warn("Please enter max 3 days range", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const departure = formatDate(departureDate);
    const arrival = formatDate(arrivalDate);

    // Send the variables as parameters to func in custom hook
    await getBetweenTwoDates(departure, arrival);
  };

  // Sorting Func
  const handleSortFlights = (flights) => {
    let sortedFlights = [...flights].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.scheduleTime}`);
      const timeB = new Date(`1970-01-01T${b.scheduleTime}`);

      if (sortOption === "Earliest") {
        return timeA - timeB; // Sort by earliest time
      } else if (sortOption === "Latest") {
        return timeB - timeA; // Sort by latest time
      }
      return 0;
    });

    // Stop filter
    if (stopOption === "OneStop") {
      sortedFlights = sortedFlights.filter(
        (flight) => flight.route.destinations.length === 1
      );
    } else if (stopOption === "TwoOrMoreStops") {
      sortedFlights = sortedFlights.filter(
        (flight) => flight.route.destinations.length >= 2
      );
    }

    setFlights(sortedFlights);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleStopChange = (e) => {
    setStopOption(e.target.value);
  };

  console.log(flights);

  return (
    <div className="flex flex-col gap-6 w-full xl:max-w-4xl ">
      <div className="max-w-full flex flex-col gap-2 bg-white rounded-xl p-6 ">
        <div className="flex flex-col gap-1 md:flex-row justify-between">
          <div className="flex justify-center items-center gap-2">
            <ImAirplane />
            <p className="uppercase font-medium ">book your flight</p>
          </div>
          <div className="flex justify-center ">
            {/* Buttons changed the arrival landing text input enabled */}
            <button
              className="capitalize text-sm rounded-l-full bg-violet-900 text-white px-3 py-2"
              onClick={() => setOneWay(false)}
            >
              round trip
            </button>
            <button
              className="capitalize text-sm rounded-r-full bg-violet-300 text-violet-900 px-3 py-2"
              onClick={() => setOneWay(true)}
            >
              one way
            </button>
          </div>
        </div>
        <form
          className="flex flex-col items-center md:items-start gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-1">
              <TextInput id="email4" type="email" icon={FaPlaneDeparture} />

              <TextInput
                id="email4"
                type="email"
                icon={FaPlaneArrival}
                className="rounded-l-none"
                disabled={oneWay}
              />
            </div>
            <div className="flex gap-1">
              {/* Getting date from client */}
              <Datepicker
                onSelectedDateChanged={(e) => setDepartureDate(e)}
                value={departureDate}
                required
              />
              <Datepicker
                required
                onSelectedDateChanged={(e) => setArrivalDate(e)}
                value={arrivalDate}
              />
            </div>
          </div>
          <Button
            className="capitalize bg-violet-900  text-white w-32 rounded-md"
            size="sm"
            type="submit"
          >
            show flights
          </Button>
        </form>
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <img
            className="w-20 h-20 object-cover text-center"
            src={loadingGif}
            alt="loading"
          />
        </div>
      )}
      {flights.length === 0 && (
        <div className="flex justify-center items-center">
          <p>You have not selected date yet !</p>
        </div>
      )}
      <div className="flex flex-wrap-reverse justify-center lg:justify-between gap-6 p-1 ">
        <div className=" mb-10 flex flex-col gap-14 p-1">
          {/* If betweenFlightList exist send flight props to Flight component */}
          {flights &&
            flights.map((flight) => <Flight key={flight.id} flight={flight} />)}
        </div>
        {flights.length > 1 && (
          <div className="flex flex-col gap-2 w-80 md:w-44 px-2">
            <p className="capitalize ">sort by:</p>
            <Select id="sortBy" onChange={handleSortChange} value={sortOption}>
              <option value="Earliest">Earliest time</option>
              <option value="Latest">Latest time</option>
            </Select>
            <p className="capitalize text-xs font-semibold">stop time</p>

            <div className="flex items-center gap-2">
              <Radio
                id="onestop"
                name="stops"
                value="OneStop"
                className="text-violet-900 focus:ring-violet-900"
                checked={stopOption === "OneStop"}
                onChange={handleStopChange}
              />
              <Label htmlFor="onestop">1 Stop</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="twoplusstop"
                name="stops"
                value="TwoOrMoreStops"
                className="text-violet-900 focus:ring-violet-900"
                checked={stopOption === "TwoOrMoreStops"}
                onChange={handleStopChange}
              />
              <Label htmlFor="twoplusstop">2+ Stops</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightContainer;
