import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import getAllPost from "@/hooks/getAllPost";
import getSuggestUser from "@/hooks/useGetSuggestedUser";
import LeftSidebar from "./LeftSidebar";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  getAllPost();
  getSuggestUser();

  return (
    <div className={`flex home-page ${isMobile ? 'full-width' : ''}`}>
      {!isMobile && <LeftSidebar />} {/* Conditionally render the left sidebar */}
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Home;
