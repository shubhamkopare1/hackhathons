


import { Routes, Route,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./components/Resister";
import Dashboard from "./pages/Dashboard";


const App = () => {
  const location = useLocation();
  const [showNavbar,setShownavbar]= useState(true);

  useEffect(() => {
    setShownavbar(location.pathname !== "/dashboard")
  },[location.pathname])

  return (
    <>
     { showNavbar && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
