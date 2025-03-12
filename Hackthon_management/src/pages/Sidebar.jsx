import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiFileText,
  FiCreditCard,
  FiGrid,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const roles = sessionStorage.getItem("role");
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/team/logout", {
        method: "GET",
        credentials: "include", // Ensure cookies are included
      });
  
      const data = await response.json();
  console.log(data);
  
      if (response.ok) {
        // Session clear karo
        sessionStorage.clear();
        alert("Logout successful!");
  
        // Redirect to home page
        window.location.href = "/";
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Hackathon</h2>
        <nav className="space-y-4">
          <SidebarLink to="/dashboard" label="Dashboard" icon={<FiGrid />} />
          <SidebarLink to="/dashboard/my-team" label="My Team" icon={<FiUsers />} />
          <SidebarLink to="/dashboard/rules" label="Rules" icon={<FiFileText />} />
          <SidebarLink to="/dashboard/payment-receipt" label="Payment Receipt" icon={<FiCreditCard />} />
          <SidebarLink
    to="/"
    label="LogOut"
    icon={<FiCreditCard />}
    onClick={handleLogout} // 🔥 Logout function call
  />

          {roles === "admin" && (
            <SidebarLink to="/dashboard/getAllTeam" label="getAllTeam" icon={<FiCreditCard />} />
          )}
        </nav>
      </div>
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
