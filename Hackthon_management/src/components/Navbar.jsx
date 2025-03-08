import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">Hackathon</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" label="Home" />
          <NavLink to="/register" label="Register" />
          <NavLink to="/login" label="Login" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-3xl transition-transform focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Overlay Navigation) */}
      <div
        className={`fixed top-0 left-0 w-full h-ful bg-blue-700 bg-opacity-95 flex flex-col items-center justify-center space-y-6 transition-all duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } md:hidden`}
      >
        <button 
          className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <FiX />
        </button>
        <NavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
        <NavLink to="/register" label="Register" onClick={() => setIsOpen(false)} />
        <NavLink to="/login" label="Login" onClick={() => setIsOpen(false)} />
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="text-lg font-medium hover:text-yellow-300 transition duration-300"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;

