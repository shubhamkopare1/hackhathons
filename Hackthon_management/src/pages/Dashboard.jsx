

import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import { useState } from "react";
import { FiMenu,FiX } from "react-icons/fi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed Width & Responsive */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-40  text-gray-950 p-4 transition-transform 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-72 w-64  `}
      >
        <Sidebar role="teamLeader" />
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-sky-600 p-2 rounded-full text-white text-2xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
       
      >
      {isSidebarOpen ? <FiX/>:<FiMenu/>}
      </button>

      {/* Main Content - Centered on Web and Responsive on Mobile */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen md:ml-72 transition-all duration-300">
        <Outlet /> {/* This will render MyTeam and other components */}
      </div>
    </div>
  );
};

export default Dashboard;