import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuggestedUser = () => {
  const { suggestedUser } = useSelector((store) => store.auth);

  return (
    <>
      <div>Suggested for you</div>
      {suggestedUser.map((item) => (
        <div key={item._id} className="flex items-center justify-between my-5">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${item._id}`}>
              <Avatar>
                <AvatarImage
                  className="w-6 h-6"
                  src={item?.profilePicture}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <Link to={`/profile/${item._id}`}>
              <div>
                <h1 className="font-semibold">{item?.username}</h1>
                <span>{item?.bio}</span>
              </div>
            </Link>
          </div>
          <span className="hover:bg-black hover:text-white cursor-pointer p-2 border-2 transition-colors duration-300 ease-in-out rounded-md">
            Follow
          </span>
        </div>
      ))}
    </>
  );
};

export default SuggestedUser;
