import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchByText } from "@/Redux/CompanySlice";

const Companies = () => {
    const navigate = useNavigate();
    const [input ,setInput] = useState("");
    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(setSearchByText(input))


    },[input])
  return (
    <div className="max-w-6xl xl:mx-auto  mx-2 sm:mx-10  my-10">
      <div
        className=" justify-between flex items-center my-5
      ">
        <Input  onChange={(e) => setInput(e.target.value)} className=" sm:w-96 w-40 rounded   " placeholder="filter by name" />
        <Button onClick={() => navigate("/admin/companies/create")} 
        className="bg-slate-400  rounded "
          >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
