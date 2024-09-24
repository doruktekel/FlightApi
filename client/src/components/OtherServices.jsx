import { FaCar } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { MdCardTravel } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const OtherServices = () => {
  // Creating right-side commercial images
  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-wrap flex-col sm:flex-row sm:justify-start xl:flex-col gap-4 min-w-[300px] "
    >
      <Link className="relative hover:shadow-xl" to={"/rent-car"}>
        <img
          className="w-[300px] h-[200px] object-cover rounded-2xl"
          src="https://plus.unsplash.com/premium_photo-1661288451211-b61d32db1d11?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="car"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
          <FaCar className="text-2xl" />
          <p className=" uppercase   font-semibold ">car rentals</p>
        </div>
      </Link>
      <Link className="relative hover:shadow-xl" to={"/hotels"}>
        <img
          className="w-[300px] h-[200px] object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1544477597-7e30412ada8c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hotels"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
          <FaHotel className="text-2xl" />
          <p className=" uppercase   font-semibold">hotels</p>
        </div>
      </Link>
      <Link className="relative hover:shadow-xl" to={"/travel-package"}>
        <img
          className="w-[300px] h-[200px] object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="travel"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
          <MdCardTravel className="text-2xl" />
          <p className=" uppercase   font-semibold">Travel Packages</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default OtherServices;
