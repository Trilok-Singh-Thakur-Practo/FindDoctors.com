import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchDoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Specialities on Load
  useEffect(() => {
    fetch("http://localhost:8080/speciality/allSpecialities")
      .then((res) => res.json())
      .then((data) => setSpecialities(data))
      .catch((err) => console.error("Error fetching specialities:", err));
  }, []);

  // Search Doctors by Name or Speciality
  const handleSearch = (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/doctor/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error searching doctors:", error);
        setError("Failed to search doctors");
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Find Doctors</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search doctor by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Speciality List */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {specialities.length > 0 ? (
          specialities.map((speciality) => (
            <button
              key={speciality.specialityId}
              onClick={() => handleSearch(speciality.specialityName)}
              style={{
                padding: "10px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {speciality.specialityName}
            </button>
          ))
        ) : (
          <p>Loading specialities...</p>
        )}
      </div>

      {/* Display Search Results */}
      {loading && <h3>Loading...</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Link
              to={`/doctor/${doctor.doctorId}`}
              key={doctor.doctorId}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <img
                  src={doctor.image || "https://via.placeholder.com/100"}
                  alt={doctor.name || "Doctor"}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <div>
                  <h3>{doctor.name || "Name Not Available"}</h3>
                  <p><strong>Speciality:</strong> {doctor.speciality?.specialityName || "Not Available"}</p>
                  <p><strong>Location:</strong> {doctor.city || "Not Available"}</p>
                  <p>
                    <strong>Qualifications:</strong>{" "}
                    {doctor.qualifications?.length > 0
                      ? doctor.qualifications.join(", ")
                      : "Not Available"}
                  </p>
                  <p><strong>Experience:</strong> {doctor.experience ? `${doctor.experience} years` : "Not Available"}</p>
                  <p><strong>Consultation Fee:</strong> {doctor.consultationFee > 0 ? `₹${doctor.consultationFee}` : "Free"}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No doctors found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDoctorsPage;
