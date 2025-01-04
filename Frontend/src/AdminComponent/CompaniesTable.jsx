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
import useGetAllCompany from "@/Hooks/useGetAllCompany";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  useGetAllCompany();
  const { allCompany, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(allCompany);

  useEffect(() => {
    const filterCompany =allCompany?.length >=0 && allCompany.filter((item) =>{
      if(!searchCompanyByText){
        return true;
      }
      return item?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filterCompany);
  }, [allCompany,searchCompanyByText]);
  return (
    <div className="max-w-7xl xl:mx-auto w-[107%] mx-2 sm:mx-10  my-10">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length <= 0 ? (
            <span>you haven't register any company yet.</span>
          ) : (
            <>
              {filterCompany?.map((item) => (
                <tr key={item._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item?.logo}></AvatarImage>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 cursor-pointer">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${item._id}`)
                          }
                          className="flex items-center space-x-3 ">
                          <Edit2></Edit2>
                          <span>Edit</span>
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

export default CompaniesTable;
