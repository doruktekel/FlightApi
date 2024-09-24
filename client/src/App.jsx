import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Deals from "./pages/Deals";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";
import MyFlights from "./pages/MyFlights";

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-50  ">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-flights" element={<MyFlights />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/discover" element={<Discover />} />

        {/* Not found page for unknown urls */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
