import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchQueryText } from "@/Redux/JobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Haryana", "Chandigarh", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "Data Scientist",
      "Full Stack",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42k-1Lakh", "5-20Lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchQueryText(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white px-.05 md:mx-6  rounded-md">
      <h1 className="font-bold text-lg text-center text-red-400 ">Filter Job</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="">
            <h1 className="font-bold text-[13px] sm:text-[15px] md:text-[17px]">
              {data.filterType}
            </h1>
            {data.array.map((item, inx) => {
              const itemId = `r${inx}-${index}`;
              return (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  key={inx}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex sm:my-1 my-0.5  items-center sm:space-x-2 space-x-1 ">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label
                    htmlFor={itemId}
                    className="my-1 text-[10px] sm:text-[15px] md:text-[17px]">
                    {item}
                  </Label>
                </motion.div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
