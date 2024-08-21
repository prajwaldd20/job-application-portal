import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Edit2Icon, Mail, PhoneIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import { Button } from "./ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
const randomArr = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const resumeExist = true;
  return (
    <>
      <div>
        <Navbar />
        <div className="mt-20 flex gap-2">
          <div className=" w-[30%] bg-slate-200  py-2 mx-4 px-2 my-3 h-2/3 border border-gray-400  rounded-xl ">
            <h2 className="font-bold text-xl underline">Your Profile</h2>

            <div className="flex justify-between mt-5 mb-3 ">
              <Avatar className="h-24 w-24 ">
                <AvatarImage src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-business-user-profile-vector-png-image_1541960.jpg" />
              </Avatar>
              <Button
                onClick={() => setOpen(true)}
                className="h-8 w-8 bg-slate-300 rounded-lg p-1 font-extrabold cursor-pointer hover:border-gray-800 hover:bg-slate-400 text-black"
              >
                <Edit2Icon />
              </Button>
            </div>
            <div className="my-3 py-2">
              <h3 className="font-semibold text-2xl ">{user?.fullName}</h3>
              <span className="text-gray-800 font-normal ">
                {user?.profile?.bio}
              </span>
              <div className="flex gap-5 my-3 ">
                <Mail />
                <span>{user?.email}</span>
              </div>

              <div className="flex gap-5 my-2">
                <PhoneIcon />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>

            <div className="h-8 w-auto flex gap-5 my-4">
              {user?.profile?.skills.length <= 0 ? (
                <span>No skills </span>
              ) : (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              )}
            </div>

            <div className="my-2 mx-2">
              <Label className="mr-2 font-semibold text-md">Resume:</Label>
              {resumeExist ? (
                <a
                  target="blank"
                  href={user?.profile.resume}
                  className="text-md text-blue-800 underline "
                >
                  {user?.profile.resumeOriginalName}
                </a>
              ) : (
                <span>No resume</span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-purple-800 underline mt-4 w-3/5">
              Your Applied Jobs
            </h3>
            <AppliedJobsTable />
          </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;
