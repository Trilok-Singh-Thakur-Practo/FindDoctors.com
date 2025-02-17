import React, { useState } from "react";
import axios from "axios";

const AddSpecialityPage = () => {
  const [specialityName, setSpecialityName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!specialityName.trim()) {
      setMessage("Please enter a speciality name.");
      return;
    }

    try {
       await axios.post("http://localhost:8080/speciality/add-speciality", {
        specialityName,
      });

      setMessage(`New Speciality added successfully!`);
      setSpecialityName("");
    } catch (error) {
      console.error("Error adding speciality:", error);
      setMessage("Error adding speciality. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-52">
      <h2 className="text-2xl font-bold text-center text-gray-800">Add New Speciality</h2>

      {message && <p className="text-center mt-4 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-gray-700 font-semibold">Speciality Name:</label>
        <input
          type="text"
          placeholder="Enter Speciality Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={specialityName}
          onChange={(e) => setSpecialityName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddSpecialityPage;
