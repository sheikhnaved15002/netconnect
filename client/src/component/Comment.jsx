import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import store from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ post }) => {
  //   const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="flex items-center gap-3 cursor-pointer">
        <Avatar>
          <AvatarImage src={post?.author.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-bold">{post?.author.username}</h3>
        <span className="ml-8">{post?.text}</span>
      </div>
      <div></div>
    </>
  );
};

export default Comment;
