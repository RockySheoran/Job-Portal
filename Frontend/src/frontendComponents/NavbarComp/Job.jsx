import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  
  const handleJobTime = (mongoTime) =>{
    const createdAt = new Date(mongoTime);
    const currTime  = new Date();
    const timeDifferent = currTime-createdAt;
    return Math.floor(timeDifferent/(1000*24*60*60));
  }
  return (
    <div className=" px-3 py-2  rounded-md shadow-md bg-gray-100 border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">
          {handleJobTime(job?.createdAt) == 0
            ? "Today"
            : `${handleJobTime(job?.createdAt)} days ago`}{" "}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex gap-3 items-center my-2">
        <div className="flex items-center gap-2 my-2">
          <Button className="p-6 rounded-full " variant="outline" size="icon">
            <Avatar className="rounded-full">
              <AvatarImage
                src={job?.company?.logo}
                className="rounded-full"></AvatarImage>
            </Avatar>
          </Button>
        </div>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-gray-500">India</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
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
      <div className="gap-4 flex justify-between mt-3">
        <Button
          onClick={() => navigate(`description/${job._id}`)}
          variant="outline"
          className="rounded">
          Details
        </Button>
        <Button className="bg-red-600 rounded">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
