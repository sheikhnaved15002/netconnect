import { setAuthUser } from "@/redux/authSlice";
import { setPost, setSelectedPost } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
// import { setAuthUser, setSelectedPost, setPost } from "../redux/actions"; // Adjust imports based on your setup

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP}/protected-route`, { withCredentials: true });
        
        if (!res.data.success || user===null) {
          // If token is invalid or user is null, clear Redux and navigate to login
          dispatch(setAuthUser(null));
          dispatch(setSelectedPost(null));
          dispatch(setPost([]));
          navigate("/login");
        }
      } catch (error) {
       
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPost([]));
        navigate("/login");
      }
    };

    checkAuth();
  }, [user, dispatch, navigate]); 

  return <>{children}</>;
};

export default ProtectedRoute;
