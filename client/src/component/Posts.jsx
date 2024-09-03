import React, { useEffect } from "react";
import Post from "./Post";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { setPost } from "@/redux/postSlice";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  console.log(posts);
  return (
    <div>
      {posts.map((item) => (
        <Post key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Posts;
