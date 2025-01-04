import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/Redux/authSlice";
import { USER_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import {
  Braces,
  Home,
  List,
  ListCheck,
  ListCollapse,
  ListOrdered,
  LogIn,
  LogOut,
  User2,
} from "lucide-react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BsCardList } from "react-icons/bs";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkTheme = "";

  const toggleMenu = () => setIsOpen(!isOpen);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black mb-20 w-full">
      {/* Fixed Navbar */}
      <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#f83002]">Portal</span>
            </h1>
          </div>
          <div className="link flex items-center gap-3 lg:gap-12 ">
            <ul className="md:flex  gap-4 md:gap-5 font-medium items-center hidden md:block">
              {user && user.role === "Recruiter" ? (
                <>
                  <li>
                    <Link to="/">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browser</Link>
                  </li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="logButton  flex items-center gap-2">
                <Link to="/login" className="md:block hidden">
                  <Button variant="outline" className="  ">
                    Login
                  </Button>
                </Link>
                <Link to="signup" className="md:block hidden">
                  <Button
                    variant="out"
                    className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    SingUp
                  </Button>
                </Link>
                <div className=" md:hidden focus:outline-none flex gap-2">
                  <button
                    className=" ml-1  focus:outline-none"
                    onClick={toggleMenu}>
                    <BsCardList className="h-10 w-10" />
                  </button>
                </div>

                <div
                  className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                  } transition-transform duration-300 md:hidden z-[50]`}>
                  <button
                    className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    onClick={toggleMenu}>
                    X
                  </button>
                  <div onClick={toggleMenu} className="mt-16 space-y-3 px-6 ">
                    <Link
                      to="/"
                      className="flex gap-2 items-center w-full bg-red-600 py-2 px-2 rounded-md ">
                      <Home /> <span>Home</span>
                    </Link>

                    <Link to="/jobs" className="flex gap-2 items-center">
                      <ListCollapse /> <span>Jobs</span>
                    </Link>
                    <Link to="/browse" className="flex gap-2 items-center">
                      <Braces /> <span>Browser</span>
                    </Link>

                    <Link to="/login" className="block md:hidden">
                      <button className=" flex gap-2 p-0 rounded   items-center ">
                        {" "}
                        <LogIn className="mt-1" /> <span>Login</span>{" "}
                      </button>
                    </Link>
                    <Link to="/signup" className="block md:hidden">
                      <button className=" flex gap-2 p-0  items-center ">
                        <LogIn className="mt-1" /> <span>SingUp</span>{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative md:hidden">
                  {/* Trigger Button */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2   cursor-pointer">
                    <img
                      src={user?.profile?.profilePhoto}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  <div
                    className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
                      isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 md:hidden z-[50]`}>
                    <h1 className="font-bold absolute top-4 left-4">
                      Hi {user?.fullname}
                    </h1>
                    <button
                      className="absolute top-4 right-4 text-gray-300 hover:text-white"
                      onClick={toggleMenu}>
                      X
                    </button>

                    <div
                      onClick={toggleMenu}
                      className="mt-16 space-y-5   px-6 ">
                      {user?.role === "Recruiter" ? (
                        <div className="flex flex-col gap-3">
                          <Link to="/" className="flex gap-2 items-center">
                            <Home /> <span>Companies</span>
                          </Link>

                          <Link
                            to="/admin/jobs"
                            className="flex gap-2 items-center">
                            <ListCollapse /> <span>Jobs</span>
                          </Link>
                          <div className="profileButton flex w-fit p-0  items-center gap-1.5 cursor-pointer  w-full bg-red-600 py-2 px-2 rounded-md">
                            <LogOut />

                            <Button
                              onClick={logoutHandler}
                              variant="link"
                              className="p-0 h-0 text-white">
                              LogOut
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Link
                            to="/"
                            className="flex gap-2 items-center w-full bg-red-500 py-2 px-2 rounded-md  ">
                            <Home /> <span>Home</span>
                          </Link>

                          <Link
                            to="/jobs"
                            className="flex gap-2 items-center  w-full bg-red-600 py-2 px-2 rounded-md">
                            <ListCollapse /> <span>Jobs</span>
                          </Link>
                          <Link
                            to="/browse"
                            className="flex gap-2 items-center  w-full bg-red-600 py-2 px-2 rounded-md">
                            <Braces /> <span>Browser</span>
                          </Link>
                          <div className="viewProfile my-2 text-gray-600 flex-col  w-full bg-red-600 py-2 px-2 rounded-md">
                            {user && user.role === "Recruiter" ? (
                              ""
                            ) : (
                              <div className="profileButton flex w-fit p-0 items-center gap-1.5 cursor-pointer ">
                                <User2 className="text-white" />

                                <Button
                                  variant="link"
                                  className="p-0 h-0 text-white">
                                  <Link to="/profile">View profile</Link>
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="profileButton flex w-fit p-0  items-center gap-1.5 cursor-pointer  w-full bg-red-600 py-2 px-2 rounded-md">
                            <LogOut />

                            <Button
                              onClick={logoutHandler}
                              variant="link"
                              className="p-0 h-0 text-white">
                              LogOut
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Popover className="hidden md:block">
                  <PopoverTrigger asChild className="hidden md:block">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="image"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="avatar  flex gap-4 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="image"
                        />
                      </Avatar>
                      <div className="contentAvatar">
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="viewProfile my-2 text-gray-600 flex-col">
                      {user && user.role === "Recruiter" ? (
                        ""
                      ) : (
                        <div className="profileButton flex w-fit items-center gap-1.5 cursor-pointer">
                          <User2 />

                          <Button variant="link">
                            <Link to="/profile">View profile</Link>
                          </Button>
                        </div>
                      )}
                      <div className="profileButton flex w-fit items-center gap-1.5 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          LogOut
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black text-white bg-opacity-50 z-40 md:hidden"
              onClick={toggleMenu}></div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
