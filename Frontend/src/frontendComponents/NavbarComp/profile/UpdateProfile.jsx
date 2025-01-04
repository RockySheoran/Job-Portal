import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/Redux/authSlice";
import { USER_API_END_POINT } from "@/utils/apiHead";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",

    file: user?.profile?.resume || "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandle = async (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(input)
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        console.log(res.data.user);
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);

      toast.error(e.response.data.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-black z-[9999] mt-20 rounded-lg">
      <Dialog open={open} >
        <DialogContent
          className="sm:max-w-[425px] z-[9999999] rounded-xl text-black bg-gray-100 "
          onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
            <DialogDescription>
              Update your profile details, including your name, email, phone
              number, bio, and skills.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSumbit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  onChange={changeEventHandler}
                  name="fullname"
                  id="name"
                  value={input.fullname}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  onChange={changeEventHandler}
                  name="email"
                  id="email"
                  value={input.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  PhoneNumber
                </Label>
                <Input
                  onChange={changeEventHandler}
                  name="phoneNumber"
                  id="phoneNumber"
                  value={input.phoneNumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  onChange={changeEventHandler}
                  name="bio"
                  id="bio"
                  value={input.bio}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  onChange={changeEventHandler}
                  name="skills"
                  id="skills"
                  value={input.skills}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  onChange={changeFileHandle}
                  name="file"
                  id="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>

            {loading ? (
              <Button className=" mr-2 my-4 w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
              </Button>
            ) : (
              <DialogFooter>
                <Button className=" mr-2 my-4 w-full bg-gray-700 hover:bg-gray-500 text-white" type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
