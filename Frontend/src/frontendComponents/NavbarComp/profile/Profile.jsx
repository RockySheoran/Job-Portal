import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAllApplied from "@/Hooks/useGetAllApplied";





const isResume = true;


const Profile = () => {
    const { user } = useSelector((store) => store.auth);
    useGetAllApplied();
    // console.log(allAppliedJob);
   
   
  const [open , setOpen] = useState(false)
  return (
    <div>
      <div className="max-w-4xl md:mx-auto w-[107%] bg-white border rounded-xl hover:bg-slate-50 border-gray-200 p-2 ml-2  md:p-8 my-5">
        <div className="flex  items-center justify-between">
          <div className="flex gap-4 items-center ">
            <Avatar className="md:h-24 md:w-24 h-16 w-16">
              <AvatarImage alt="profile" src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="name ">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
           
            className="text-right  ">
            <Pen className="" />
          </Button>
        </div>
        <div className="ml-4 my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="skill space-y-2 ">
          <h1 className="font-bold text-xl">Skills</h1>
          <div className="flex items-center gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills?.map((item, index) => (
                <Badge key={index} className="bg-slate-200">{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="resume my-4 grid w-full max-w-sm items-center gap-1.5">
          <Label className=" text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              className="w-full text-blue-500 hover:underline"
              target="black"
              href={user?.profile?.resume}>
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl">
        <AppliedJobTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
