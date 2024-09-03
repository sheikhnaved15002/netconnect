import CreatePost from "@/components/ui/CreatePost";
import { setAuthUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const sidebarItem = [
    { icon: <Home />, name: "Home" },
    { icon: <Search />, name: "Search" },
    { icon: <TrendingUp />, name: "Explore" },
    { icon: <MessageCircle />, name: "Messages" },
    { icon: <Heart />, name: "Notifications" },
    { icon: <PlusSquare />, name: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage
            className="w-6 h-6"
            src={user?.profilePicture}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      name: "Profile",
    },
    { icon: <LogOut />, name: "Logout" },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/user/logout`,
        { withCredentials: true }
      );
      if (res?.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res?.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sideBarHandler = (item) => {
    if (item === "Logout") {
      logoutHandler();
    } else if (item === "Create") {
      setOpen(true);
    }
  };
  return (
    <div className="fixed top-0 left-0 z-10 px-2 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col ">
        <h1 className="cursor-pointer  " onClick={() => navigate("/")}>
          <img
            className=""
            src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png"
            alt=""
          />
        </h1>
        {sidebarItem.map((item) => (
          <div
            onClick={() => sideBarHandler(item.name)}
            key={item.name}
            className="flex items-center gap-4 relative hover:bg-gray-200 cursor-pointer my-3 p-3"
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
