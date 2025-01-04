import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LatestJobCard = ({job}) => {
    const navigate = useNavigate();
  return (
    <>
      <div
        onClick={()=>navigate(`jobs/description/${job._id}`)}
        className="card p-5 mx-3 shadow-xl  rounded-xl  bg-white border border-gray-100 hover:scale-105 cursor-pointer">
        <div className="  ">
          <h1 className=" font-bold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">india</p>
        </div>
        <div className="div">
          <h1 className="font-semibold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {job?.position}
          </Badge>
          <Badge className={"text-red-600 font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-purple-600 font-bold"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </>
  );
}

export default LatestJobCard
