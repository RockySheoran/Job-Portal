import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "sonner";



const PostJob = () => {
    const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    requirement: "",
    salary: "",
    jobType: "",
    experience: "",
    position: 0,
    location: "",
    companyId: "",
    description: "",
  });
  const EventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectHandleChange =(value) =>{
    const selectedCompany = allCompany.find((com) => com.name.toLowerCase() === value)
   setInput({ ...input, companyId:selectedCompany._id });
  }
  const { allCompany } = useSelector((store) => store.company);
  const[loading ,setLoading]= useState(false);
  const SubmitHandler = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
            headers:{
                'Content-Type' :"application/json",
            },
            withCredentials:true,

        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }
    } catch (e) {
        console.log(e)
        toast.error(e.response.data.message);
        
    }
    finally{
        setLoading(false);
    }
  }
  return (
    <div className="max-w-4xl   md:mx-auto w-[107%] mx-2 sm:mx-10 ">
      <div className="flex flex-col items-center justify-between w-full  my-5">
        <div className="my-5">
          <h1 className="font-bold text-xl"> New Job Details</h1>
        </div>
        <form
          onSubmit={SubmitHandler}
          className="w-full px-5 py-5 shadow-xl bg-gray-100
         border-slate-500 border-1 rounded-md">
          <div className="grid gap-5 sm:grid-cols-2 px-4">
            <div className="">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                required
                placeholder="Enter your title"
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border my-1"
              />
            </div>
            <div className="">
              <Label>Requirement</Label>
              <Input
                type="text"
                name="requirement"
                value={input.requirement}
                required
                placeholder="Enter requirements "
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                required
                placeholder="Enter salary "
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                required
                placeholder="Enter jobType"
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                required
                placeholder="Enter experiences"
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                required
                placeholder="Enter location"
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>No. ofPosition</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                required
                placeholder="Enter position "
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            <div className="">
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                required
                placeholder="Enter job description"
                onChange={EventHandler}
                className="focus-visible:ring-offset-0  focus-visible:ring-red-600 ring-0 border-3 border-black focus-visible:border-0  border  my-1"
              />
            </div>
            {allCompany.length > 0 && (
              <Select onValueChange={selectHandleChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompany?.map((item) => {
                      return (
                        <SelectItem
                          key={item._id}
                          value={item?.name?.toLowerCase()}>
                          {item?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <div className="div w-full flex items-center justify-center my-4">
              <Button className="min-w-96 ">
                <Loader2 />
                <span>Please wait</span>
              </Button>
            </div>
          ) : (
            <div className="div w-full flex items-center justify-center my-4">
              <Button type="submit" className="min-w-96 ">
                Post new job
              </Button>
            </div>
          )}

          {allCompany.length == 0 && (
            <p className="text-red-600 text-sm font-bold text-center">
              *please register a company first, before posting
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
