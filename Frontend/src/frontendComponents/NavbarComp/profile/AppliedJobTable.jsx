import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React from 'react'
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJob } = useSelector((store) => store.jobs);


  
  return (
    <div className="  overflow-x-hidden ">
      <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
      <Table>
        <TableCaption>A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="gap-1">
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right pr-10 overflow-visible">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJob.length <= 0 ? (
            <span> you have not applied any job till</span>
          ) : (
            allAppliedJob?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell> {item?.job?.company?.name}</TableCell>
                <TableCell className="text-right  ">
                  <Badge
                    className={`px-4 py-2  ${
                      item.status == "rejected"
                        ? "bg-red-500"
                        : item.span == "accepted"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } `}>
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable
