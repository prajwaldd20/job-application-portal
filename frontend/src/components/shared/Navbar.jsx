import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;

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
            <ul className="flex font-medium items-center gap-5">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>
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
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer my-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Hello Mobiles</h4>
                        <p className="test-sm text-muted-foreground">
                          Lorem ipsum dolor sit, amet
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 my-4 text-gray-800">
                      <div className=" flex w-fit items-center gap-3 cursor-pointer">
                        <User2 />
                        <Button variant="link">View Profile</Button>
                      </div>

                      <div className="flex  w-fit items-center gap-3 cursor-pointer">
                        <LogOut />
                        <Button variant="link">Logout</Button>
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
