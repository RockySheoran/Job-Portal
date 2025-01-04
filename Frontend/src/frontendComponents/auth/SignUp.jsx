import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading } from "@/Redux/authSlice";
import { USER_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandle = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    // console.log(formData)
    try {
      dispatch(setLoading(true));
      console.log(`${USER_API_END_POINT}/register`);
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (e) {
      // console.log(e)
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={sumbitHandler}
        className="md:w-1/2 sm:w-2/3 ml-6 border border-gray-200 w-full rounded-md p-4 my-10">
        <h1 className="font-bold text-xl mb-5 ">Sign Up</h1>
        <div className="label my-2">
          <Label> Full Name </Label>
          <Input
            type="text"
            value={input.fullname}
            onChange={changeEventHandler}
            name="fullname"
            required
            placeholder="Rocky"
          />
        </div>
        <div className="label my-2">
          <Label> Email </Label>
          <Input
            type="email"
            value={input.email}
            onChange={changeEventHandler}
            name="email"
            required
            placeholder="xyz@gmail.com"
          />
        </div>
        <div className="label my-2">
          <Label> PhoneNumber </Label>
          <Input
            type="text"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            name="phoneNumber"
            required
            placeholder="99949545xx"
          />
        </div>
        <div className="label my-2">
          <Label> Password </Label>
          <Input
            type="text"
            value={input.password}
            onChange={changeEventHandler}
            name="password"
            required
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
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandle}
              name="file"
              className="cursor-pointer"
            />
          </div>
        </div>
        {loading ? (
          <Button className=" mr-2 my-4 w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-4 bg-gray-500 hover:bg-gray-300 ">
            Sign Up
          </Button>
        )}

        <span className="text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-6000 pl-3 text-red-900 font-bold">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
