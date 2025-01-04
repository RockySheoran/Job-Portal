import React, { useEffect } from 'react'
import ApplicantTable from './ApplicantTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/apiHead'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplication } from '@/Redux/applicationSlice'

const ApplicantDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    
    const { allApplicant } = useSelector((store) => store.applicant);
    useEffect(()=>{ 
        const fetchAllApplicant = async () =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                    withCredentials:true
                });
                
                if(res.data.success){
                    dispatch(setApplication(res.data.job))
                    
                }
            } catch (error) {
                
            }
        }
        fetchAllApplicant();

    },[])
  return (
    <div className="max-w-7xl  xl:mx-auto  mx-2 sm:mx-10  my-10">
      <h1 className="font-bold text-xl my-5 ml-3">
        Applicant{" "}
        <span className="text-red-500">
          ({allApplicant?.applications?.length})
        </span>
      </h1>

      <ApplicantTable />
    </div>
  );
}

export default ApplicantDetails
