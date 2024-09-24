import { useState } from "react";

const useGetBetweenTwoDates = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [betweenFlightList, setBetweenFlightList] = useState([]);

  // Using another func (async) for sending flight data
  const getBetweenTwoDates = async (departure, arrival) => {
    setLoading(true);
    // Try to send departure and arrival data to backend
    try {
      const res = await fetch("/api/flights/between-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departure,
          arrival,
        }),
      });
      const data = await res.json();
      // If res is ok, setting data to our flights state
      if (res.ok) {
        setBetweenFlightList(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Returning our states and func
  return {
    error,
    loading,
    getBetweenTwoDates,
    betweenFlightList,
  };
};

export default useGetBetweenTwoDates;
