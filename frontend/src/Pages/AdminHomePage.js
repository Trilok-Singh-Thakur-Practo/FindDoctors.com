import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Admin Page!
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/doctor/add-doctor")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Add New Doctor
          </button>
          <button
            onClick={() => navigate("/practice/add-practice")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Add New Practice
          </button>
          <button
            onClick={() => navigate("/speciality/add-speciality")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Add New Speciality
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
