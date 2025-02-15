import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchDoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("Dentist");
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Specialities on Load
  useEffect(() => {
    fetch("http://localhost:8080/speciality/allSpecialities")
      .then((res) => res.json())
      .then((data) => {
        setSpecialities(data.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching specialities:", err));

      // 🔹 Default search for "Dentist"
      handleSearch("Dentist");
  }, []);

  // Search Doctors by Name or Speciality
  const handleSearch = (query) => {
    if (!query.trim()) return;
    setError(null);

    fetch(`http://localhost:8080/doctor/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error("Error searching doctors:", error);
        setError("Failed to search doctors");
      });
  };

  // Handle Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="min-h-screen mt-16 flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Find Best Doctor for You
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Search doctor by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          🔍 Search
        </button>
      </form>

      {/* Speciality List */}
      <div className="flex flex-wrap justify-center gap-3 my-6 w-full max-w-3xl">
        {specialities.map((speciality) => (
          <button
            key={speciality.specialityId}
            onClick={() => handleSearch(speciality.specialityName)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-500 hover:text-white transition-all"
          >
            {speciality.specialityName}
          </button>
        ))}
      </div>

      {/* Display Search Results */}
      {error && <h3 className="text-red-600">{error}</h3>}

      <div className="w-full max-w-4xl mt-6 flex flex-col items-center">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="flex items-center justify-between bg-white shadow-lg p-5 rounded-2xl mb-4 w-full max-w-3xl hover:scale-105 transition-all cursor-pointer"
              onClick={() => navigate(`/doctor/${doctor.doctorId}`)} // Card Click Handler
            >
              {/* Left Side - Doctor Info */}
              <div className="flex items-center">
                <img
                  src={doctor.image || "https://www.w3schools.com/howto/img_avatar.png"}
                  alt={doctor.name || "Doctor"}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{doctor.name || "Name Not Available"}</h3>
                  <p className="text-gray-600"><strong>Speciality:</strong> {doctor?.specialityName || "Not Available"}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {doctor.city || "Not Available"}</p>
                  <p className="text-gray-600"><strong>Experience:</strong> {doctor.experience ? `${doctor.experience} years` : "Not Available"}</p>
                  <p className="text-blue-600 font-semibold"><strong>Consultation Fee:</strong> {doctor.consultationFee > 0 ? `₹${doctor.consultationFee}` : "Free"}</p>
                </div>
              </div>

              {/* Right Side - Book Now Button */}
              <Link to={`/doctor/${doctor.doctorId}`} onClick={(e) => e.stopPropagation()}>
                <button className="bg-green-500 text-white px-5 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 hover:scale-105 transition-all">
                  📅 Book Now
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-center mt-4">No doctors found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDoctorsPage;
