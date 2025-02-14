import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  // Fetch specialties from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/speciality/allSpecialities") // Replace with your actual API URL
      .then((response) => {
        console.log(response.data);
        setSpecialties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specialties:", error);
      });
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/doctor/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="home-container">
      {/* Search Section */}
      <div className="search-section">
        <h1>Find Doctors Near You</h1>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search doctor by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Specialties Section */}
      <div className="specialties-section">
        <h2>Consult top doctors for any health concern</h2>
        <div className="specialties-list">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="specialty-card"
              onClick={() => navigate(`/doctor/search?query=${specialty.specialityName}`)}
            >
              <img src={specialty.iconUrl} alt={specialty.specialityName} />
              <p>{specialty.specialityName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
