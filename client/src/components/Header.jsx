import { Link } from "react-router-dom";
import { ImAirplane } from "react-icons/im";
import { MdDiscount } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";

import profilePhoto from "../assets/doruktekel.jpeg";

const Header = () => {
  return (
    <div className="w-full fixed top-0 right-0 left-0 bg-gray-50 shadow-sm z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 ">
        <Link to={"/"} className="flex gap-2 justify-center items-center">
          <ImAirplane className="text-violet-900 text-xl" />
          <p className="uppercase font-medium text-lg ">plane scape</p>
        </Link>

        {/* This area showing to client smaller than medium screen */}
        {/* Mini Menu */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="flex gap-2 items-center md:hidden">
              <Avatar rounded alt="user" img={profilePhoto} />{" "}
            </div>
          }
        >
          <Link to={"/my-flights"}>
            <DropdownItem>My Booking Flights </DropdownItem>
          </Link>{" "}
          <Link to={"/deals"}>
            <DropdownItem>Deals </DropdownItem>
          </Link>{" "}
          <Link to={"/discover"}>
            <DropdownItem>Discover </DropdownItem>
          </Link>
        </Dropdown>

        {/* This area showing to client more than large screen */}
        <div className="hidden md:flex gap-6 capitalize">
          <Link to={"deals"} className="flex gap-2 items-center">
            <MdDiscount className="text-violet-900 text-lg" />
            <p className="text-sm">deals</p>
          </Link>
          <Link to={"/discover"} className="flex gap-2 items-center">
            <BiWorld className="text-violet-900 text-lg" />
            <p className="text-sm">discover</p>
          </Link>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex gap-2 items-center">
                <Avatar rounded alt="user" img={profilePhoto} />{" "}
                <p className="text-sm">Doruk Tekel</p>
              </div>
            }
          >
            <Link to={"/my-flights"}>
              <DropdownItem>My Booking Flights </DropdownItem>
            </Link>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
