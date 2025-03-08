import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUsers, FiFileText, FiCreditCard, FiGrid } from "react-icons/fi";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-72 p-4 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6">Hackathon</h2>
        <nav className="space-y-4">
          <SidebarLink to="/dashboard" label="Dashboard" icon={<FiGrid />} />
          {role === "teamLeader" && <SidebarLink to="/my-team" label="My Team" icon={<FiUsers />} />}
          <SidebarLink to="/rules" label="Rules" icon={<FiFileText />} />
          <SidebarLink to="/payment-receipt" label="Payment Receipt" icon={<FiCreditCard />} />
        </nav>
      </div>

      {/* Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-full text-white text-2xl"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <Link to={to} className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-800 transition">
    {icon}
    <span className="text-lg">{label}</span>
  </Link>
);

export default Sidebar;
