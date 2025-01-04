import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllAdminJob from "@/Hooks/useGetAllAdminJob";
import useGetAllCompany from "@/Hooks/useGetAllCompany";
import { JOB_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JobsTable = () => {
  

    useGetAllAdminJob();


  

  
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);
 
  const [filterJob, setFilterJob] = useState(allAdminJobs);

  useEffect(() => {
    const filterJob =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((item) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          item?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          item?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJob(filterJob);
  }, [allAdminJobs, searchJobByText]);

  const DeleteHandle = async (jobId) => {
    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/jobDelete`,

        {
          data: { jobId },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
       
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  
  return (
    <div className="max-w-7xl xl:mx-auto w-[107%] mx-2 sm:mx-10  my-10">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob?.length <= 0 ? (
            <span>you haven't register any company yet.</span>
          ) : (
            <>
              {filterJob.map((item) => (
                <tr key={item._id}>
                  <TableCell>{item?.company.name}</TableCell>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 cursor-pointer">
                        <div
                          onClick={() => DeleteHandle(item._id)}
                          className="flex items-center mb-2 space-x-3 ">
                          <Delete></Delete>
                          <span>Delete</span>
                        </div>
                        <hr className="h-1  m-0 p-0" />
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${item._id}/applicant`)
                          }
                          className="flex items-center w-fit  space-x-3 pt-0">
                          <Eye className="h-6 pt-1" />
                          <span>Applicant</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
