import React from "react";
import { Badge } from "./ui/badge";

const JobCard = ({ job }) => {
  return (
    <div className="border border-gray-100 shadow-md p-5">
      <div className="my-2">
        <h1 className="font-semibold text-xl text-purple-800">
          {job?.company?.name}
        </h1>
        <p className="font-normal"> {job?.location}</p>
      </div>
      <div className="my-2 py-2">
        <h1 className="text-lg font-semibold text-red-600">{job?.title}</h1>
        <p className="font-normal text-sm">{job?.description}</p>
      </div>
      <div className="flex gap-5 justify-around ">
        <Badge className="bg-yellow-400 text-black  p-2 hover:bg-yellow-500 font-semibold shadow-lg cursor-default ">
          {job?.position <= 0
            ? "0 position"
            : job?.position == 1
            ? "1 position"
            : job?.position + " positions"}
        </Badge>
        <Badge className="bg-green-400 text-black  p-2 font-semibold shadow-lg hover:bg-green-500 cursor-default">
          {job?.jobType}
        </Badge>
        <Badge className="bg-red-200 text-black  p-2 font-semibold shadow-lg   hover:bg-red-300 cursor-default">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;
