import React, { useState } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const LatestJob = () => {
  const { allJob } = useSelector((store) => store.jobs);
  const [loading,setLoading] = useState(false);
  
  useState(()=>{
    setLoading(allJob.length <= 0 ? true : false);
  },[allJob,loading])
  // console.log(loading)

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
         
          <span className="text-red-500">NO JOB AVAILABLE</span>
          
          
          
        ) : (
          allJob
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
        {
          loading && <div className="h-30"> <Loader2/> <h1>fvf</h1> </div>
        }
      </div>
    </div>
  );
};

export default LatestJob;
