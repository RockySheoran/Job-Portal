import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import JobsTable from "./JobsTable";
import { setSearchJobByText } from "@/Redux/JobSlice";


const AdminJobs = () => {
 
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="max-w-6xl xl:mx-auto mx-2 sm:mx-10  my-10">
      <div
        className=" justify-between flex items-center my-5
      ">
        <Input
          onChange={(e) => setInput(e.target.value)}
          className=" sm:w-96 w-40  rounded"
          placeholder="filter by name,role"
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="bg-slate-400  rounded">
          New Job
        </Button>
      </div>
      <JobsTable />
    </div>
  );
};

export default AdminJobs;
