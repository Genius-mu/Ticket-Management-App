import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section className="h-[35em] gap-x-3 flex flex-wrap xl:flex-nowrap md:flex-nowrap sm:flex-nowrap justify-center gap-y-1 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-300 items-center w-full">
        <Link
          to="/Login"
          className="bg-white/90 hover:scale-106 z-10 transition text-black [box-shadow:1px_1px_2px_#000] shadow-xl relative font-semibold text-1xl pt-3 pb-3 pl-9 pr-9 rounded-2xl"
        >
          Login
        </Link>
        <Link
          to="/Signup"
          className="bg-white/90 hover:scale-106 z-10 transition text-black [box-shadow:1px_1px_2px_#000] shadow-xl relative font-semibold text-1xl pt-3 pb-3 pl-9 pr-9 rounded-2xl"
        >
          Sign Up
        </Link>
        <img src="src/assets/wave.svg" alt="" className="absolute bottom-0" />
      </section>
    </>
  );
};

export default LandingPage;
