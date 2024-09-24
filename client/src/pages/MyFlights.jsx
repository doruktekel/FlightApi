import { Select } from "flowbite-react";
import { MdInfoOutline } from "react-icons/md";
import { useState } from "react";

import useGetBookedFlights from "../hooks/useGetBookedFlights";
import loadingGif from "../assets/loadingPlane.gif";
import MyFlight from "../components/MyFlight";

const MyFlights = () => {
  const [sortOption, setSortOption] = useState("createdAt_desc");

  // Getting states from useGetBookedFlights custom hook
  const { flights, loading, error } = useGetBookedFlights(
    sortOption.split("_")[0], // sort criteria
    sortOption.split("_")[1] // order criteria (asc or desc)
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  // When loading is true clint will see the gif
  if (loading)
    return (
      <div className="max-w-7xl mx-auto min-h-screen mt-20 p-4 flex items-center justify-center">
        <img
          className="w-40 h-40 object-cover"
          src={loadingGif}
          alt="loading"
        />
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto mt-20 p-4 flex flex-col gap-4">
      <p className="text-center">My Flights</p>
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-2 items-center">
          <p>Sort by:</p>

          <Select id="sortBy" onChange={handleSortChange} value={sortOption}>
            <option value="createdAt_asc">Earliest created time</option>
            <option value="createdAt_desc">Latest created time</option>
            <option value="scheduleTime_asc">Earliest schedule time</option>
            <option value="scheduleTime_desc">Latest schedule time</option>
          </Select>
        </div>
        <div className="flex gap-2 items-center ">
          <MdInfoOutline />
          <p className="capitalize">
            avg fare: <span className="font-semibold">$$$</span>
          </p>
        </div>
      </div>
      {/* If flights exist send the myFlight props to each MyFlight component */}
      {flights &&
        flights.map((myFlight) => (
          <MyFlight myFlight={myFlight} key={myFlight._id} />
        ))}
      {error && <p className="text-red-500 text-xs my-2">* {error}</p>}
    </div>
  );
};

export default MyFlights;
