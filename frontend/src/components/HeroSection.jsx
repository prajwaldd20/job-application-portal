import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <div className="text-center relative top-24">
        <span className="p-4 mt-1 rounded-full font-medium text-red-600  text-lg">
          Best Website to Find Your Next Job!!
        </span>
        <h1 className="text-5xl font-semibold  p-2 leading-tight">
          Explore, Apply <br /> & Elevate Your Career with <br />
          <span className=" font-bold">
            Next
            <span className="text-green-600">Job </span>!!
          </span>
        </h1>
        <p className=" max-w-3xl mx-auto">
          At{" "}
          <span className="font-bold">
            Next<span className="text-green-600 font-bold">Job</span>
          </span>
          , we believe in turning job searches into success stories. With a vast
          network of employers and personalized job matches, we help you
          navigate the path to your next big opportunity.
        </p>

        <div className="flex w-2/5 shadow-lg rounded-full mx-auto pl-3 my-5 border-gray-400 border-2 ">
          <input
            type="text"
            placeholder="Explore jobs..."
            className="outline-none border-none w-full p-2 m-1 "
          />
          <Button className="rounded-r-full  bg-purple-800  py-6 hover:bg-purple-700">
            <Search className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
