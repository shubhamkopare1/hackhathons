
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUsers,
  FiFileText,
  FiCreditCard,
  FiGrid,
} from "react-icons/fi";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Hackathon</h2>
        <nav className="space-y-4">
          <SidebarLink to="/dashboard" label="Dashboard" icon={<FiGrid />} />
          <SidebarLink
            to="/dashboard/my-team"
            label="My Team"
            icon={<FiUsers />}
          />
          <SidebarLink
            to="/dashboard/rules"
            label="Rules"
            icon={<FiFileText />}
          />
          <SidebarLink
            to="/dashboard/payment-receipt"
            label="Payment Receipt"
            icon={<FiCreditCard />}
          />
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-800 transition"
  >
    {icon}
    <span className="text-lg">{label}</span>
  </Link>
);

export default Sidebar;