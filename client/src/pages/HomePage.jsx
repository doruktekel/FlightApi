import FlightContainer from "../components/FlightContainer";
import OtherServices from "../components/OtherServices";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto my-20  flex flex-wrap gap-10 md:gap-2 justify-center md:justify-between  p-4  ">
      <FlightContainer />
      <OtherServices />
    </div>
  );
};

export default HomePage;
