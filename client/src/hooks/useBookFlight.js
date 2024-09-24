import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useBookFlight = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Using another func (async) for sending some data
  const bookFlights = async (
    scheduleDate,
    scheduleTime,
    flightName,
    flightNumber
  ) => {
    setLoading(true);
    // Try to send scheduleDate,scheduleTime,flightName and flightNumber data to backend
    try {
      const res = await fetch("/api/flights/book-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduleDate,
          scheduleTime,
          flightName,
          flightNumber,
        }),
      });
      const data = await res.json();

      // If res is ok, show to client with toast and navigate MyFlights page
      if (res.ok) {
        navigate("/my-flights");
        toast.success("Booked your flight successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setError("Failed while fetching data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Returning our func
  return { bookFlights };
};

export default useBookFlight;
