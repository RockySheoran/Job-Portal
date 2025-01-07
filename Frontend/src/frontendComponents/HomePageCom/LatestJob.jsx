import React, { useState } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const LatestJob = () => {
  const { allJob } = useSelector((store) => store.jobs);

  


  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h1 className="md:text-4xl  text-2xl font-bold">
        <span className="text-red-600 ml-4">Latest & Top </span> Job Opening
      </h1>
      <div
        className={`jobCard grid lg:grid-cols-3 mx-auto sm:grid-cols-2 gap-4 mt-6 ${
          window.innerWidth > 375 && "mx-6"
        }  `}>
        {allJob.length <= 0 ? (
          <div className="flex justify-center w-full gap-3 content-center  ">
            <span className="text-red-500  text-center   ">
              <h1 className="animate-spin h-12 w-12 border-2 border-red-700  border-t-0  rounded-full "> </h1>
            </span>
            <span className="text-black h-20 text-center  ">Loading...</span>
          </div>
        ) : (
          allJob
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
       
      </div>
    </div>
  );
};

export default LatestJob;
