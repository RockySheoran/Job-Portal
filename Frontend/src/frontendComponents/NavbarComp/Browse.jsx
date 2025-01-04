import React, { useEffect } from 'react'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQueryText } from '@/Redux/JobSlice';
import useGetAllJob from '@/Hooks/useGetAllJob';

const Browse = () => {
  useGetAllJob();
  const {allJob} = useSelector((store) => store.jobs);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchQueryText(""));
  })
  return (
    <div className="max-w-7xl w-[107%] sm:mx-8 md:mx-auto mx-4">
      <h1 className="font-bold mb-7 mt-3 text-3xl md:ml-16">
        Search Result <span className="text-red-600 ">( {allJob.length} )</span>
      </h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:ml-16  mx-auto gap-8">
        {allJob.map((item, index) => {
          return <Job key={item._id} job={item} />;
        })}
      </div>
    </div>
  );
}

export default Browse
