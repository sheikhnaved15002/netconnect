import { setSuggestedUser } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const getSuggestUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP}/api/v1/user/suggesteduser`,
          { withCredentials: true }
        );
        if (res?.data.success) {
          dispatch(setSuggestedUser(res.data.users));
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchSuggestedUser();
  }, []);
};

export default getSuggestUser;
