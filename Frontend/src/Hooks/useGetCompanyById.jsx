import { setSingleCompany } from "@/Redux/CompanySlice";
import { setAllJob } from "@/Redux/JobSlice";
import { COMPANIES_API_END_POINT, JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = async (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${COMPANIES_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };
    fetchData();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
