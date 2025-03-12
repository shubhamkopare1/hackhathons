import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api"; // Import login API function

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "admin" });
  const [error, setError] = useState(""); // For displaying errors
  const navigate = useNavigate(); // For redirecting

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData); // Call API
      console.log("✅ Login Success:", response.data);

      // Store token & role in localStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Role Selection Buttons */}
        <div className="flex gap-4 mb-5">
          <button
            type="button"
            className={`w-1/2 py-2 rounded-lg font-medium transition-all ${
              formData.role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleToggle("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded-lg font-medium transition-all ${
              formData.role === "team" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleToggle("team")}
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
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleChange}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
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
