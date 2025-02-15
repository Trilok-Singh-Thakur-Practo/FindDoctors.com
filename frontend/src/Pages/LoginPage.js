import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (password === "admin123") {
        alert("Admin Login Successful!");
        // Redirect to Admin Dashboard
      } else {
        alert("Incorrect Admin Password!");
      }
    } else if (role === "user") {
      navigate('/user-home');
    } else {
      alert("Please select a role.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form 
        className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Login </h2>

        {/* Role Selection */}
        <div className="space-y-3">
          <button
            type="button"
            className={`w-full p-3 rounded-xl font-medium transition ${
              role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setRole("admin");
            }}
          >
            Enter as Admin
          </button>

          <button
            type="button"
            className={`w-full p-3 rounded-xl font-medium transition ${
              role === "user" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setRole("user");
              setPassword(""); // Reset password when switching to user
            }}
          >
            Enter as User
          </button>
        </div>

        {/* Admin Password Input */}
        {role === "admin" && (
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full p-2 border rounded-xl text-center"
            required
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
