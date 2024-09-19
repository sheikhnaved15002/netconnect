import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";

export const getUserProfile = (userid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP}/api/v1/user/profile/${userid}`,
          { withCredentials: true }
        );
        if (res?.data.success) {
          dispatch(setUserProfile(res?.data.user));
          console.log(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [userid]);
};
