import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import getAllPost from "@/hooks/getAllPost";
import getSuggestUser from "@/hooks/useGetSuggestedUser";
// import { Modal } from 'antd';

const Home = () => {
  getAllPost();
  getSuggestUser();
  return (
    <>
      <div className="flex">
        <div className="flex-grow">
          <Feed />
          <Outlet />
        </div>
        <RightSideBar />
      </div>
    </>
  );
};

export default Home;
