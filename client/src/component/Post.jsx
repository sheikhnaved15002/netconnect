import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaHeart } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";
import {
  Bookmark,
  BookmarkCheck,
  ChartArea,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  SquareArrowUpRight,
} from "lucide-react";

import React, { useState } from "react";
import CommentDialog from "./CommentDialog";
// import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
// import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";

import { setPost, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "@/components/ui/badge";
import { setAuthUser } from "@/redux/authSlice";
// import { c } from "vite/dist/node/types.d-aGj9QkWt";

const Post = ({ post }) => {
  const [comment, setComment] = useState(post.comments);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  // const [like,setLike] = useState(post.likes.included(user?._id)|| false)
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const [totalLike, setTotalLike] = useState(post.likes.length);
  const dispatch = useDispatch();
  const [like, setLike] = useState(post.likes.includes(user && user?._id) || false);
  // const [checkBookmark, setCheckBookmart] = useState(
  //   user?.bookmarks?.includes(post?._id || false)
  // );
  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP}/api/v1/post/deletepost/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res?.data.success) {
        const updatedPost = posts.filter((post) => post._id !== id);
        dispatch(setPost(updatedPost));
        toast.success("Post deleted");
        setMoreOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleLikePost = async (id) => {
    try {
      const action = like ? "dislike" : "like";
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/post/${action}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res?.data.success) {
        const updatedLikes = like ? totalLike - 1 : totalLike + 1;
        setTotalLike(updatedLikes);
        setLike(!like);
        const updatedPost = posts.map((p) =>
          p?._id === id
            ? {
                ...p,
                likes: like
                  ? p?.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPost(updatedPost));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const addCommentHandler = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/post/comment/${id}`,
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
          p?._id === id ? { ...p, comments: updateCommentData } : p
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
  const handleBookmark = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/post/bookmark/${post?._id}`,
        { withCredentials: true }
      );
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="my-8 w-full max-w-[500px] mx-auto px-4 sm:px-6 lg:px-8 border-b-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="w-6 h-6"
              src={post?.author.profilePicture}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1>{post?.author.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant={"secondary"}>Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="  flex flex-col justify-center font-bold text-sm text-center items-center ">
            {post?.author._id !== user?._id ? (
              <Button
                variant="ghost"
                className="cursor-pointer w-full font-bold hover:bg-gray-300 text-[#ED4956] hover:text-[#ED4956]"
              >
                Unfollow
              </Button>
            ) : null}
            <Button
              variant="ghost"
              className="cursor-pointer w-full font-bold hover:bg-gray-300"
            >
              Add to favourite
            </Button>

            {post.author._id === user._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-full font-bold hover:bg-gray-300"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-3 object-cover w-full bg-red-200 aspect-auto"
        src={post?.image}
        alt=""
      />
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <div onClick={() => handleLikePost(post._id)}>
            {!like ? (
              <Heart className="cursor-pointer hover:text-gray-600" />
            ) : (
              <FaHeart
                size={24}
                color="red"
                className="cursor-pointer hover:text-gray-600 bg"
              />
            )}
          </div>

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(!open);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <div className="flex gap-5 cursor-pointer" onClick={handleBookmark}>
          <Bookmark/>
        </div>
      </div>
      <span className="font-medium mb-2 block">{totalLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post?.author.username}</span>
        {post.caption}
      </p>
      <span
        onClick={() => {
          dispatch(setSelectedPost(post));
          setOpen(!open);
        }}
        className="text-gray-400 cursor-pointer hover:text-black block"
      >
        {post.comments.length > 0 && `view all ${post.comments.length}`}
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center">
        <input
          className="font-medium w-full mt-2 outline-none text-sm"
          placeholder="Add a comment... "
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        {text.trim() !== "" ? (
          <span
            className="cursor-pointer hover:bg-black hover:text-white p-2 rounded-md border-black border-2 "
            onClick={() => addCommentHandler(post?._id)}
          >
            post
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
