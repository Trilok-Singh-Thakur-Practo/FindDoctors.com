import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchPracticesPage = () => {
  const [searchTerm, setSearchTerm] = useState("Dentist");
  const [practices, setPractices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/speciality/allSpecialities")
      .then((res) => res.json())
      .then((data) => setSpecialties(data))
      .catch((error) => console.error("Error fetching specialties:", error));

    // Default search for "Dentist"
    handleSearch("Dentist");
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) return;
    setError(null);

    fetch(`http://localhost:8080/practice/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPractices(data);
      })
      .catch((error) => {
        console.error("Error searching practices:", error);
        setError("Failed to search practices");
      });
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-100 to-blue-300 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Find Hospitals/Clinics</h1>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}
          className="flex flex-col md:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Search
          </button>
        </form>

        {/* Specialties List */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Search by Specialties</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {specialties.length > 0 ? (
            specialties.map((specialty) => (
              <button
                key={specialty.specialityId}
                onClick={() => handleSearch(specialty.specialityName)}
                className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
              >
                {specialty.specialityName}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No specialties available.</p>
          )}
        </div>

        {/* Display Search Results */}
        {error && <h3 className="text-center text-lg text-red-500">{error}</h3>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practices.length > 0 ? (
            practices.map((practice) => (
              <Link to={`/practice/${practice.practiceId}`} key={practice.practiceId}>
                <div className="border p-4 rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-all transform hover:scale-105">
                  {/* Practice Image */}
                  <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipoCwTztmFkxZb93a5YK7pf0rNYhCx89ruQ&s"}
                    alt={practice.name}
                    className="w-2/3 h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">{practice.name || "Name Not Available"}</h3>
                    <p className="text-gray-600"><strong>Specialization:</strong> {practice.specialityName || "Not Available"}</p>
                    <p className="text-gray-600"><strong>Location:</strong> {practice.city || "Not Available"}</p>
                    
                    {/* Book Now Button */}
                    <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <p className="text-center text-red-600">No practices found. Try another search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPracticesPage;
