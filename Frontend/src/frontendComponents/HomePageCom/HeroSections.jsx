import { Button } from '@/components/ui/button'
import { setSearchQueryText } from '@/Redux/JobSlice';
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSections = () => {
  const [query ,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () =>{
    dispatch(setSearchQueryText(query));
    navigate("/browse");
    

  }
  return (
    <div className='text-center'>
      <div className="headerContent flex gap-5 flex-col items-center">
        <span className='px-4 mx-auto w-fit py-2 rounded-full bg-gray-100 text-[#e83002] font-medium '>No. 1 Job Hunt website</span>
        <h1 className='md:text-5xl text-3xl  font-bold  '>Search , Apply & <br /> Get your <span className='text-[#6a38c2]'>Dream Job</span></h1>
        <p className='md:w-[50%] w-[90%]   '>Welcome to JobPortal – your ultimate platform to search and apply for jobs at your favorite companies. Unlock opportunities and connect with top employers today!</p>
        <div className="inputFild w-[80%] sm:w-[55%] flex border border-gray-200 shadow-lg rounded-full items-center gap-4 mx-auto  ">
          <input type="text"  onChange={(e) => setQuery(e.target.value) }   placeholder='Find your dream job' className='outline-none px-3    w-full  border-0' />

          <Button onClick={searchJobHandler} className="rounded-r-full bg-zinc-600 " > <Search className='h-5 w-5 '/> </Button>
        </div>
      </div>

    </div>
  )
}

export default HeroSections
