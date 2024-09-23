import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CreatePost from "@/components/ui/CreatePost";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setAuthUser } from "@/redux/authSlice";
import { setPost, setSelectedPost } from "@/redux/postSlice";
import { clearNotification, setLikeNotification } from "@/redux/rtnSlice";
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
  const [userEmail] = useState(user?.email)
  const [open, setOpen] = useState(false);
  const { likeNotification } = useSelector(
    (store) => store.realtimenotification
  );
  const sidebarItem = [
    {
      icon: <img className="w-8 h-8" src="/netconnect.png" alt="logo" />,
      name: "NETCONNECT",
    },
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
        // const userEmail = user.email;
        navigate("/login",{state:{email:userEmail}});
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPost([]));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setAuthUser(null));
      dispatch(setSelectedPost(null));
      dispatch(setPost([]));
      navigate("/login");
    }
  };

  const sideBarHandler = (item) => {
    if (item === "Logout") {
      logoutHandler();
    } else if (item === "Create") {
      setOpen(true);
    } else if (item === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (item === "Home" || item === "NETCONNECT") {
      navigate("/");
    } else if (item === "Messages") {
      navigate("/chat");
    }
  };

  return (
    <div className="sidebar-container fixed top-0 left-0 z-10 border-r border-gray-300 w-[70px] md:w-[10%] lg:w-[15%] h-screen bg-white">
    <div className="sidebar-content flex flex-col">
      <h1 className="cursor-pointer" onClick={() => navigate("/")}></h1>
      {sidebarItem.map((item) => (
        <div
          onClick={() => sideBarHandler(item.name)}
          key={item.name}
          className="flex items-center gap-4 relative hover:bg-gray-200 cursor-pointer my-2 p-3 w-full"
        >
          <span className="block">{item.icon}</span>
          <span className="hidden lg:block xl:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
            {item.name === "NETCONNECT" ? (
              <h1 className="netconnect font-semibold hover:scale-75 transition-all ease-out duration-500 hover:font-extrabold">
                {item.name}
              </h1>
            ) : (
              item.name
            )}
          </span>
        </div>
      ))}
    </div>
    {/* Bottom icons for smaller screens */}
    <div className="bottom-icons md:hidden">
      {sidebarItem.map((item) => (
        <div
          key={item.name}
          onClick={() => sideBarHandler(item.name)}
          className="flex flex-col items-center"
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
