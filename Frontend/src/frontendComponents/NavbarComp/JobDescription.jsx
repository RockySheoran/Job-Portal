import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/Redux/JobSlice";

import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const isInitialApplied =
    singleJob?.applications.some(
      (application) => application.applicant?._id === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitialApplied);

  useEffect(() => {
    setIsApplied(isInitialApplied);
  }, [isInitialApplied]);

  const jobApplyHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };

        dispatch(setSingleJob(updateSingleJob));
        setIsApplied(true);
        console.log(isApplied, "aa");

        // console.log(res.data);
        toast.success(res.data.message);
        // dispatch(setSingleJob())
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // console.log(isApplied)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };
    fetchData();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mt-4 px-3  items-center mx-auto ">
      <div className="flex  justify-between items-center">
        <div className="">
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position}
            </Badge>
            <Badge className={"text-red-600 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-purple-600 font-bold"} variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : jobApplyHandler}
          disabled={isApplied || !user}
          className={`rounded-lg ${
            isApplied || !user
              ? "bg-gray-600 cursor-not-allowed  "
              : "bg-purple-600  hover:bg-purple-800"
          }`}>
          {isApplied ? "Already apply" : "Apply now"}
        </Button>
      </div>
      <div className="">
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className=" my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experience}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
