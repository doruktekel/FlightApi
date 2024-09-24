import { useState, useEffect } from "react";

const useGetBookedFlights = (sort, order) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using another func (async) for booking flight
  const fetchFlights = async () => {
    setLoading(true);
    // Try to getting data with this path
    try {
      // const res = await fetch("/api/flights/book-flights");
      const res = await fetch(
        `/api/flights/book-flights?sort=${sort}&order=${order}`
      );
      const data = await res.json();
      // If res is ok, setting data to our flights state
      if (res.ok) {
        setFlights(data);
      } else {
        setError("Error fetching booked flights");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // When page is open, call our fetch func
  useEffect(() => {
    fetchFlights();
  }, [sort, order]);

  // Returning our states
  return { flights, loading, error };
};

export default useGetBookedFlights;
