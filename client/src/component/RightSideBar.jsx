import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUser from "./SuggestedUser";

const RightSideBar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="max-w-3xl mx-auto">
      <div className=" my-20 pr-14 hidden md:block mx-auto">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${user?._id}`}>
            <Avatar>
              <AvatarImage
                className="w-6 h-6"
                src={user?.profilePicture}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <Link to={`/profile/${user?._id}`}>
            <div>
              <h1 className="font-semibold">{user?.username}</h1>
              <span>{user?.bio}</span>
            </div>
          </Link>
        </div>
        <SuggestedUser />
      </div>
    </div>
  );
};

export default RightSideBar;
