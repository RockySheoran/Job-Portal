import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/Hooks/useGetCompanyById";
import { COMPANIES_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

const CompanySetup = () => {
  const params = useParams();
  
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    location: "",
    website: "",
    file: "null",
    description: "",
  });
  const {singleCompany} = useSelector((store)=> store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const companyId = params.id;
  useGetCompanyById(companyId);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("location", input.location);
    formData.append("website", input.website);
    formData.append("file", input.file);
    formData.append("description", input.description);
    try {
      setLoding(true);
      const res = await axios.put(
        `${COMPANIES_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoding(false);
    }
  };
useEffect(()=>{
    setInput({
      name: singleCompany.name || "",
      location: singleCompany.location || "",
      website: singleCompany.website || "",
      file: singleCompany.file || null,
      description: singleCompany.description || "",
    });

},[singleCompany])
 

  return (
    <div className="max-w-xl lg:mx-auto my-10  mx-3 sm:mx-10 md:mx-20">
      <div className="">
        <div className="flex items-center justify-between md:p-8 px-3 my-3">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center text-gray-500 font-semibold">
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl"> Company setup</h1>
        </div>
        <form className="" onSubmit={onSubmitHandler}>
          <div className="grid sm:grid-cols-2 gap-3  mb-4 ">
            <div className="name grid  gap-2 items-center ">
              <Label>Company Name</Label>
              <Input
                type="text"
                value={input.name}
                name="name"
                onChange={changeEventHandler}
                required
                className=""
              />
            </div>

            <div className="name grid  gap-2 items-center ">
              <Label>Website</Label>
              <Input
                type="text"
                value={input.website}
                name="website"
                onChange={changeEventHandler}
                required
                className=""
              />
            </div>
            <div className="name grid  gap-2 items-center ">
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                name="location"
                onChange={changeEventHandler}
                required
                className=""
              />
            </div>
            <div className="name grid  gap-2 items-center ">
              <Label>Description</Label>
              <Input
                type="text"
                value={input.description}
                name="description"
                onChange={changeEventHandler}
                required
                className=""
              />
            </div>
            <div className="name grid  gap-2 items-center ">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                required
                className=""
              />
            </div>
          </div>
          {loading ? (
            <Button type="submit" className="w-full">
              <Loader2 />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
