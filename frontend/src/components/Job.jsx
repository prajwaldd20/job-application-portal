import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "aksdaskdfh";
  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currTime = new Date();
    const timeDiff = currTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-4 border rounded-md shadow-lg mt-2 ">
      <div className="flex justify-between">
        <p className=" text-gray-600">
          {daysAgoFunc(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunc(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="my-2 flex gap-6 ">
        <Button className="rounded-full p-0 m-0 border border-teal-100">
          <Avatar className={"rounded-full h-12 w-12"}>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOlTezGgsBAn4DasU4m8KdGi3uCADG0ZjsJcX4RLLFKKAj8Rq8d4Ll5OPY4RQiYcLnFM&usqp=CAU" />
          </Avatar>
        </Button>
        <div className="ml-2">
          <h1 className="text-lg text-red-900 font-bold ">
            {job?.company?.name}
          </h1>
          <p className="font-normal"> {job?.location}</p>
        </div>
      </div>

      <div className="my-2 py-2">
        <h1 className="font-bold text-lg text-blue-600">{job?.title}</h1>
        <p className="font-normal">{job?.description}</p>
      </div>

      <div className="flex justify-around ">
        <Badge
          className="bg-yellow-400 text-black  p-2 font-semibold shadow-lg
            hover:bg-yellow-500 cursor-default
        "
        >
          {job?.position <= 0
            ? "0 position"
            : job?.position == 1
            ? "1 position"
            : job?.position + " positions"}
        </Badge>
        <Badge
          className="bg-green-400 text-black  p-2 font-semibold shadow-lg
        hover:bg-green-500 cursor-default
        "
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-red-200 text-black  p-2 font-semibold shadow-lg
        hover:bg-red-300 cursor-default
        "
        >
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="mt-5 flex justify-around">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
