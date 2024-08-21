import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Browse = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="font-bold mx-4 text-lg text-purple-800">
          Search Results ({jobsArray.length}) :
        </h2>
        <div className="grid grid-cols-3 gap-10 px-3 mt-2 mb-4 ">
          {jobsArray.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </>
  );
};

export default Browse;
