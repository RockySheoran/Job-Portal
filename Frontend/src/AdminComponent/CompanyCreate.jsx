import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/Redux/CompanySlice'
import { COMPANIES_API_END_POINT } from '@/utils/apiHead'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async() =>{
        try{
            const res= await axios.post(`${ COMPANIES_API_END_POINT}/register`,{companyName},{
                headers:{
                    "Content-Type":'application/json',
                },
                withCredentials:true,
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company));
                const companyId = res?.data?.company?._id;
                toast.success(res.data.message);
                navigate(`/admin/companies/${companyId}`);
                
            }
        }
        catch(e){
            console.log(e)
            toast.error(e.response.data.message)

        }
    }

  return (
    <div className="">
      <div className="max-w-4xl mx-auto ">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company name</h1>
          <p className="text-gray-500">
            What would you like to give your company name ? you can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input type="text" value ={companyName.company} name="company" onChange={(e)=>setCompanyName(e.target.value)} className="my-2" placeholder="jobHunt ,Microsoft" />
        <div className="flex items-center gap-2 my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline">
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate
