import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "./utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDetails = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  // console.log(singleJob);

  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        // console.log(res);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
        setIsApplied(
          res.data.job.applications.some(
            (application) => application.applicant === user?._id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto p-4 my-5">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-3xl my-2 text-orange-900 ">
            {singleJob?.title}
          </h1>
          <div className="flex gap-4 my-4  ">
            <Badge className="bg-yellow-400 text-black  p-2 hover:bg-yellow-500 font-semibold shadow-lg cursor-default ">
              {singleJob?.position} positions
            </Badge>
            <Badge className="bg-green-400 text-black  p-2 font-semibold shadow-lg hover:bg-green-500 cursor-default">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-red-200 text-black  p-2 font-semibold shadow-lg   hover:bg-red-300 cursor-default">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className="bg-purple-700 hover:bg-purple-500"
        >
          {" "}
          {isApplied ? "Already Applied" : "Apply for Job"}
        </Button>
      </div>
      <hr className="text-black mb-3" />
      <h2 className="font-bold mx-2  text-xl ">Job Description :</h2>
      <div className="p-3 my-2">
        <h3 className="font-bold text-base text-gray-700 my-1">
          Role:
          <span className="font-normal text-black ">{singleJob?.title}</span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Location:{" "}
          <span className="font-normal text-black ">{singleJob?.location}</span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Description:{" "}
          <span className="font-normal text-black ">
            {singleJob?.description}
          </span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Experience:{" "}
          <span className="font-normal text-black ">
            {singleJob?.experienceLevel} yrs
          </span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Salary:{" "}
          <span className="font-normal text-black ">
            {singleJob?.salary} LPA
          </span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Total Applicants:{" "}
          <span className="font-normal text-black ">
            {singleJob?.applications?.length}
          </span>
        </h3>

        <h3 className="font-bold text-base text-gray-700 my-1">
          Posted At:{" "}
          <span className="font-normal text-black ">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default JobDetails;
