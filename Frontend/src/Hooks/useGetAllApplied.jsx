import { setAllCompany } from "@/Redux/CompanySlice";
import {   setAllAppliedJob } from "@/Redux/JobSlice";
import { APPLICATION_API_END_POINT, } from "@/utils/apiHead";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllApplied = async () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setAllAppliedJob(res.data.application));
          
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };
    fetchData();
  }, [dispatch]);
};

export default useGetAllApplied;
