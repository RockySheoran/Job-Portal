import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const JobArray = [1, 2, 3, 4, 45, 5, 3, 6, 66, 34, 6];
const Jobs = () => {
  const { allJob, searchQueryText } = useSelector((store) => store.jobs);
  const [filterJob,setFilterJob] = useState(allJob);
  useEffect(()=>{
    if(searchQueryText){
      const filterJob = allJob.filter((job) =>{
        return (
          job.title.toLowerCase().includes(searchQueryText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQueryText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQueryText.toLowerCase()) 

        );
      }) 
      setFilterJob(filterJob);
    }
    else{
      setFilterJob(allJob);
    }
   


  },[searchQueryText,allJob])


  return (
    <div className="max-w-7xl w-[113%] mx-auto mt-20 ml-1">
      <div className="flex gap-5">
        <div className="filter w-[20%]">
          <FilterCard></FilterCard>
        </div>

        {filterJob.length <= 0 ? (
          <span> job not available</span>
        ) : (
          <div className="div flex-1 h-[88vh]  overflow-y-auto pb-5  ">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 content-center mx-auto">
              {filterJob.map((job, ind) => (
                <div key={job._id} className="job">
                  <Job key={job._id} job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
