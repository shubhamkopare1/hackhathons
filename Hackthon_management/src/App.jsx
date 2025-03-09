import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./components/Resister";
import Dashboard from "./pages/Dashboard";
import MyTeam from "./subPages/MyTeam";
import Rules from "./SubPages/Rules";
import Payment from "./SubPages/Payment";

const App = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Hide Navbar for all dashboard-related routes
    setShowNavbar(!location.pathname.startsWith("/dashboard"));
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard with Nested Routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<h2>Welcome to Dashboard</h2>} />
          <Route path="my-team" element={<MyTeam />} />
          <Route path='rules' element ={<Rules/>}/>
          <Route path='payment-receipt' element = {<Payment/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default App;

