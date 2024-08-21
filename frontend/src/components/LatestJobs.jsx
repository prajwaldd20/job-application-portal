import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <>
      <div className="max-w-7xl mx-auto my-8">
        <h3 className="text-4xl font-semibold">
          <span className="text-green-700 font-bold">Latest </span>Job Openings
        </h3>
        <div className="grid grid-cols-3 gap-6 my-5 ">
          {allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
