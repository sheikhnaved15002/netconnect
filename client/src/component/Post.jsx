import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import {
  Bookmark,
  ChartArea,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  SquareArrowUpRight,
} from "lucide-react";
import { Comment } from "postcss";

import React, { useState } from "react";
import CommentDialog from "./CommentDialog";
import { Input } from "@/components/ui/input";

const Post = () => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8 w-full max-w-sm mx-auto border-b-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="w-6 h-6"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="  flex flex-col justify-center font-bold text-sm text-center items-center ">
            <Button
              variant="ghost"
              className="cursor-pointer w-full font-bold hover:bg-gray-300 text-[#ED4956] hover:text-[#ED4956]"
            >
              Unfollow
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-full font-bold hover:bg-gray-300"
            >
              Add to favourite
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-full font-bold hover:bg-gray-300"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-3 object-cover w-full bg-red-200 aspect-auto"
        src="https://www.rocketleague.com/images/keyart/rl_evergreen.jpg"
        alt=""
      />
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Heart className="cursor-pointer hover:text-gray-600" />
          <FaHeart size={24} className="cursor-pointer hover:text-gray-600" />
          <MessageCircle
            onClick={() => setOpen(!open)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <div className="flex gap-5">
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <span className="font-medium mb-2 block">100k likes</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption
      </p>
      <span className="text-gray-400">view all comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center">
        <input
          className="font-medium w-full mt-2 outline-none text-sm"
          placeholder="Add a comment... "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        {comment.trim() !== "" ? <span>post</span> : null}
      </div>
    </div>
  );
};

export default Post;
