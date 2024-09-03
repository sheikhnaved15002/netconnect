// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CommentDialog = ({ open, setOpen }) => {
  const addCommentHandler = () => {
    location.reload();
  };
  const [comment, setComment] = useState("");
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(!open)}
        className="max-w-5xl flex flex-col p-0 "
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://www.rocketleague.com/images/keyart/rl_evergreen.jpg"
              alt=""
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col ">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">username</Link>
                  {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-gray-300 p-4">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full hover:bg-gray-300 p-4">
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr className="border-gray-600" />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
              <p>some comments here</p>
            </div>
            <div className="p-4">
              <div className="flex items-center ">
                <form
                  action=""
                  onSubmit={addCommentHandler}
                  className="flex items-center w-full"
                >
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="outline-none border border-gray-300 w-full rounded-md p-2 text-sm mr-3"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Button disabled={comment.trim() === "" ? true : false}>
                    Send
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
