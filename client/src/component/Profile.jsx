import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/hooks/getUserProfile";
import { Heart, MessageCircle } from "lucide-react";

import React, { useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  const params = useParams();
  getUserProfile(params.id);
  const { userProfile, user } = useSelector((store) => store.auth);
  //   console.log(userProfile);
  const isLoggedIn = user._id === params.id ? true : false;
  const isFollowing = true;
  const displayPost =
    activeTab === "posts"
      ? userProfile?.posts
      : activeTab === "saved"
      ? userProfile?.bookmarks
      : null;
  return (
    <div className=" flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profile picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex items-center gap-3">
              <span>{userProfile?.username}</span>
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={() => navigate("/profile/edit")}
                    variant="secondary"
                    className="hover:bg-gray-200 h-8"
                  >
                    Edit profile
                  </Button>
                  <Button variant="secondary" className="hover:bg-gray-200 h-8">
                    View archive
                  </Button>
                  <Button variant="secondary" className="hover:bg-gray-200 h-8">
                    Ad tools
                  </Button>
                </>
              ) : isFollowing ? (
                <>
                  <Button variant="secondary">Unfollow</Button>
                  <Button variant="secondary">Message</Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  className="bg-blue-400 hover:bg-blue-500 h-8"
                >
                  Follow
                </Button>
              )}
            </div>
            <div className="flex items-center mt-6 gap-4">
              <p>
                <span className="font-semibold mr-1">
                  {userProfile?.posts?.length}
                </span>
                posts
              </p>
              <p>
                <span className="font-semibold mr-1">
                  {userProfile?.followers?.length}
                </span>
                followers
              </p>
              <p>
                <span className="font-semibold mr-1">
                  {userProfile?.following?.length}
                </span>
                following
              </p>
            </div>
            <div className="mt-3 ">{userProfile?.bio}</div>
            <Badge variant="secondary" className="mt-3 w-fit cursor-pointer">
              <span className="p-1">@{userProfile?.username}</span>
            </Badge>
          </section>
        </div>
        <div className="border-t border-t-gray-600 ">
          <div className="flex gap-5 items-center justify-around">
            <span
              className={`py-3 cursor-pointer ${
                activeTab == "posts" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              Posts
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab == "reels" ? "font-bold" : ""
              }`}
              onClick={() => handleTabChange("reels")}
            >
              Reels
            </span>
            <span
              onClick={() => handleTabChange("saved")}
              className={`py-3 cursor-pointer ${
                activeTab == "saved" ? "font-bold" : ""
              }`}
            >
              Bookmarks
            </span>
            <span
              onClick={() => handleTabChange("tagged")}
              className={`py-3 cursor-pointer ${
                activeTab == "tagged" ? "font-bold" : ""
              }`}
            >
              Tagged
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 h-auto w-full p-10">
            {activeTab === "reels" ||
            activeTab === "tagged" ||
            displayPost && displayPost?.length <= 0 ? (
              <>
                <div className="col-span-full text-center">No post found</div>
              </>
            ) : (
              displayPost && displayPost?.map((item) => (
                <div key={item._id} className="relative group cursor-pointer">
                  <img
                    className="rounded-sm my-2 w-full object-contain"
                    src={item?.image}
                    alt=""
                    height={500}
                    width={500}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex gap-2 items-center hover:text-gray-300">
                        <Heart />
                        <span>{item?.likes?.length}</span>
                      </button>
                      <button className="flex gap-2 items-center hover:text-gray-300">
                        <MessageCircle />
                        <span>{item?.comments?.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
