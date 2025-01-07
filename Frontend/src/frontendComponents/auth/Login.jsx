import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading, setUser } from "@/Redux/authSlice";
import { USER_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const sumbitHandler = async (e) => {
    e.preventDefault();

    try {
     
      dispatch(setLoading(true))
    

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      

      // console.log(res.data.user)
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))

      
        navigate('/')
      }
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message);
    }
    finally {
      dispatch(setLoading(false))
    }
  }
     useEffect(()=>{
      if(user){

        navigate('/')
      }


     },[])
  return (
    <div className="flex items-center justify-center w-full max-w-7xl mx-auto">
      <form
        onSubmit={sumbitHandler}
        className="md:w-1/2 sm:w-2/3 border border-gray-200 w-full ml-8  rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 ">Login</h1>

        <div className="label my-2">
          <Label> Email </Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="xyz@gmail.com"
          />
        </div>

        <div className="label my-2">
          <Label> Password </Label>
          <Input
            type="text"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="xyz1234@"
          />
        </div>
        <div className="radio flex items-center justify-between">
          <RadioGroup className="flex items-center gsp-4 my-5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  checked={input.role == "Student"}
                  onChange={changeEventHandler}
                  name="role"
                  className="cursor-pointer"
                  value="Student"
                />
              </div>
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  name="role" // Removed the extra space
                  className="cursor-pointer"
                  value="Recruiter"
                />
              </div>
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        {
          loading ? <Button className=" mr-2 my-4 w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait</Button>
            :
            <Button type="submit" className="w-full my-4 bg-gray-700 hover:bg-gray-300">
              Login
            </Button>
        }


        <span className="text-sm">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-6000 pl-3 text-red-900 font-bold"
          >
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
