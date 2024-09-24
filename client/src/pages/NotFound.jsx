import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col  gap-4">
      <p className="text-9xl font-extrabold text-violet-900">404</p>
      <p className="text-4xl text-slate-700">Something's missing.</p>
      <p className="text-2xl text-slate-400">Sorry, we can't find that page.</p>
      <Link to={"/"}>
        <Button pill outline color="purple">
          Back To Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
