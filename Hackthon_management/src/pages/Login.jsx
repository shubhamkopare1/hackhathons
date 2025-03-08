



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "Admin" });
  const navigate = useNavigate(); // For redirecting

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.role === "Team Leader") {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(formData));

      // Redirect to the dashboard
      navigate("/dashboard");
    } else {
      alert("Login is only available for Team Leaders.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {/* Role Selection Buttons */}
        <div className="flex gap-4 mb-5">
          <button
            type="button"
            className={`w-1/2 py-2 rounded-lg font-medium transition-all ${
              formData.role === "Admin" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleToggle("Admin")}
            disabled
          >
            Admin
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded-lg font-medium transition-all ${
              formData.role === "Team Leader" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleToggle("Team Leader")}
          >
            Team Leader
          </button>
        </div>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleChange}
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleChange}
        />

        {/* Login Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
            formData.role === "Team Leader"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={formData.role !== "Team Leader"}
        >
          Login as {formData.role}
        </button>

        {/* Register Now Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
