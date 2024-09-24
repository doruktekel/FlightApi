import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImAirplane } from "react-icons/im";
import { motion } from "framer-motion";

const MyFlight = ({ myFlight }) => {
  // Destructing myFlight for reaching inside the myFlight data
  const {
    flightName,
    flightNumber,
    scheduleDate,
    scheduleTime,
    createdAt,
    _id,
  } = myFlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-10 flex flex-wrap gap-10 justify-center lg:justify-between bg-white  relative"
      key={_id}
    >
      <div className="flex gap-4 md:gap-10">
        <ImAirplane className="text-violet-900 text-xl w-8 h-8 object-cover" />
        {/* <img src={profilePhoto} alt="airway-icon" className=" rounded-full" /> */}
        <div className="flex gap-2 flex-col">
          <p className="text-2xl text-gray-500">{scheduleTime}</p>
          <div className="flex gap-2 sm:gap-6 md:gap-10 lg:gap-32">
            <div>
              <p className="capitalize font-semibold text-sm text-gray-700">
                flight number
              </p>
              <Link className="flex items-center gap-2 text-sm text-violet-500">
                <p className="capitalize">{flightNumber}</p>
                <FaPlaneDeparture />
              </Link>
            </div>
            <div>
              <p className="capitalize font-semibold text-sm text-gray-700">
                flight name
              </p>
              <p className="capitalize font-semibold text-sm text-gray-500">
                {flightName}
              </p>
            </div>
            <div>
              <p className="capitalize font-semibold text-sm text-gray-700">
                schedule date
              </p>
              <p className="uppercase font-semibold text-sm text-gray-500">
                {new Date(scheduleDate).toLocaleDateString("en-CA")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center   gap-2 ">
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>{" "}
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>{" "}
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>{" "}
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>{" "}
        <div className="border border-gray-400 w-10 h-12 lg:w-16 lg:h-20 rounded-md p-1 lg:p-2 flex flex-col gap-1 lg:gap-2 text-center justify-center">
          <p className="font-semibold text-xs lg:text-base">$$$</p>
          <p className="capitalize text-xs lg:text-sm">main</p>
        </div>
      </div>
      <div className=" flex gap-2 absolute bottom-1 right-1 font-semibold text-xs text-violet-500">
        <p className="capitalize"> created at:</p>
        {new Date(createdAt).toLocaleDateString("en-CA")}
      </div>
    </motion.div>
  );
};

export default MyFlight;
