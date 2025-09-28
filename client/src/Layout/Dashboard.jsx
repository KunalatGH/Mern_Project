import React from "react";
import UserMenu from "../assets/components/UserMenu/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector(state => state.user)
    console.log("User dashboard :", user);
    
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid grid-cols-[200px_1fr] gap-2">
        {/* {Left part} */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden sm:block border-r">
            <UserMenu/>
        </div>
        {/* {right part} */}
        <div className="bg-white min-h-[77vh]">
            <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
