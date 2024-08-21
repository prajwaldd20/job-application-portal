import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDOINT } from "../utils/constants";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className=" bg-white w-full fixed top-0 left-0 z-50">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 ">
          <div>
            <h1 className="text-3xl font-bold">
              Next
              <span className="text-green-500">Job</span>
            </h1>
          </div>

          <div className="flex items-center gap-12">
            {user && user.role === "Recruiter" ? (
              <>
                <ul className="flex font-medium items-center gap-5">
                  <li>
                    <Link to={"/admin/jobs"}>Jobs</Link>
                  </li>
                  <li>
                    <Link to={"/admin/companies"}>Companies</Link>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="flex font-medium items-center gap-5">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </ul>
            )}

            {}
            {!user ? (
              <div className="flex items-center gap-10">
                <Link to={"/login"}>
                  {" "}
                  <Button className="bg-green-800 text-white hover:bg-green-600 text-base">
                    Login
                  </Button>
                </Link>

                <Link to={"/signup"}>
                  <Button className="bg-violet-700 text-white hover:bg-violet-600  text-base ">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto
                          ? user?.profile?.profilePhoto
                          : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-business-user-profile-vector-png-image_1541960.jpg"
                      }
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer my-2">
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto
                              ? user?.profile?.profilePhoto
                              : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-business-user-profile-vector-png-image_1541960.jpg"
                          }
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullName}</h4>
                        <p className="test-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 my-4 text-gray-800">
                      {user && user.role === "Job Seeker" ? (
                        <>
                          <div className=" flex w-fit items-center gap-3 cursor-pointer">
                            <User2 />
                            <Button variant="link">
                              <Link to={"/profile"}>View Profile</Link>
                            </Button>
                          </div>
                        </>
                      ) : null}

                      <div className="flex  w-fit items-center gap-3 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
