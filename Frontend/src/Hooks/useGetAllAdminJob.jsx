
import { setAllCompany } from "@/Redux/CompanySlice";
import { setAllAdminJob, setAllJob } from "@/Redux/JobSlice";
import { JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllAdminJob = async () => {
   const dispatch = useDispatch();

   useEffect(() => {
     const fetchData = async () => {
       try {
         const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, {
           withCredentials: true,
         });
         if (res.data.success) {
          // console.log(res)
           dispatch(setAllAdminJob(res.data.jobs));
         }
       } catch (e) {
         console.log(e);
         toast.error(e.response.data.message);
       }
     };
     fetchData();
   }, [dispatch]);
}

export default useGetAllAdminJob
