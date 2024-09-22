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
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPost([]));
        navigate("/login");
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
    <div className="fixed top-0 left-0 z-10 px-2 border-r border-gray-300 w-[70px] md:w-[10%] lg:w-[15%] h-screen flex flex-col bg-white">
      <div className="flex flex-col flex-grow">
        <h1 className="cursor-pointer " onClick={() => navigate("/")}></h1>
        {/* Sidebar content */}
        <div className="flex flex-col flex-grow overflow-y-auto">
          {sidebarItem.map((item) => (
            <div
              onClick={() => sideBarHandler(item.name)}
              key={item.name}
              className="flex items-center gap-4 relative hover:bg-gray-200 cursor-pointer my-2 p-3 w-full"
            >
              {/* Show icons on all screens */}
              <span className="block">{item.icon}</span>
              {/* Show text only on lg and xl screens */}
              <span className="hidden lg:block xl:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name === "NETCONNECT" ? (
                  <h1 className="font-semibold hover:scale-75 transition-all ease-out duration-500 hover:font-extrabold">
                    {item.name}
                  </h1>
                ) : (
                  item.name
                )}
              </span>
              {item.name === "Notifications" &&
                likeNotification?.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">
                        {likeNotification.length}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        {likeNotification.length === 0 ? (
                          <p>No new notification</p>
                        ) : (
                          likeNotification.map((notification) => {
                            return (
                              <div
                                key={notification.userId}
                                className="flex items-center gap-2 my-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    className="w-6 h-6"
                                    src={
                                      notification.userDetails?.profilePicture
                                    }
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <span className="font-bold">
                                    {notification.userDetails?.username}
                                  </span>{" "}
                                  liked your post
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div
                        className="flex justify-end cursor-pointer"
                        onClick={() => dispatch(clearNotification())}
                      >
                        <Badge>mark as read</Badge>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
