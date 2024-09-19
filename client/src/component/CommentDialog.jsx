// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import store from "@/redux/store";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPost } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const { selectedPost } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const [comment, setComment] = useState([]);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, []);
  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/post/comment/${selectedPost._id}`,
        {
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data.success) {
        const updateCommentData = [res.data.comment, ...comment];
        setComment(updateCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updateCommentData } : p
        );
        dispatch(setPost(updatedPostData));
        setText("");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const [text, setText] = useState("");
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(!open)}
        className="max-w-5xl flex flex-col p-0 "
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={selectedPost?.image}
              alt=""
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col ">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">
                    {user?.username}
                  </Link>
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
              {selectedPost && selectedPost.comments.length > 0 ? (
                comment.map((item) => <Comment key={item._id} post={item} />)
              ) : (
                <p>No comments</p>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center ">
                <form
                  action=""
                  onSubmit={(e) => addCommentHandler(e)}
                  className="flex items-center w-full"
                >
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="outline-none border border-gray-300 w-full rounded-md p-2 text-sm mr-3"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                  <Button disabled={text.trim() === "" ? true : false}>
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
