import { setAllJob } from "@/Redux/JobSlice";
import { JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJob = async (  ) => {
  const dispatch = useDispatch();
  const{  searchQueryText} = useSelector((store) => store.jobs)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQueryText}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJob(res.data.jobs));
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };
    fetchData();
  }, []);
};

export default useGetAllJob;
