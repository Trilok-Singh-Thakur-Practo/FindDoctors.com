import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchPracticesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [practices, setPractices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all specialties on page load
    fetch("http://localhost:8080/speciality/allSpecialities")
      .then((res) => res.json())
      .then((data) => setSpecialties(data))
      .catch((error) => console.error("Error fetching specialties:", error));
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/practice/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPractices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error searching practices:", error);
        setError("Failed to search practices");
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Find Hospitals/Clinics</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      {/* Specialties List */}
      <h2>Search by Specialties</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {specialties.length > 0 ? (
          specialties.map((specialty) => (
            <button
              key={specialty.specialityId}
              onClick={() => handleSearch(specialty.specialityName)}
              style={{
                padding: "10px",
                border: "1px solid #007bff",
                backgroundColor: "white",
                color: "#007bff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {specialty.specialityName}
            </button>
          ))
        ) : (
          <p>No specialties available.</p>
        )}
      </div>

      {/* Display Search Results */}
      {loading && <h3>Loading...</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div>
        {practices.length > 0 ? (
          practices.map((practice) => (
            <Link to={`/practice/${practice.practiceId}`} key={practice.practiceId} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px" }}>
                <h3>{practice.name || "Name Not Available"}</h3>
                <p><strong>Specialization:</strong> {practice.speciality?.specialityName || "Not Available"}</p>
                <p><strong>Location:</strong> {practice.city || "Not Available"}</p>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No practices found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPracticesPage;
