import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPracticePage() {
  const [practice, setPractice] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    website: "", // Added website input
  });

  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]); // Added list of doctors
  const [selectedSpecialityId, setSelectedSpecialityId] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [showDoctors, setShowDoctors] = useState(false); // Toggle doctor list

  useEffect(() => {
    axios.get("http://localhost:8080/speciality/allSpecialities")
      .then(response => setSpecialities(response.data))
      .catch(error => console.error("Error fetching specialities:", error));

    axios.get("http://localhost:8080/doctor/all-doctors") // Fetching doctors
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedSpecialityId) {
      setMessage("Please select a speciality.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/practice/add-practice?specialityId=${selectedSpecialityId}&doctorIds=${selectedDoctors.join(",")}`,
        practice,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(`Practice ${response.data.name} added successfully!`);
      setPractice({ name: "", address: "", city: "", state: "", contact: "", website: "" });
      setSelectedSpecialityId(null);
      setSelectedDoctors([]);
    } catch (error) {
      console.error("Error adding practice:", error);
      setMessage("Error adding practice. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-24">
      <h2 className="text-2xl font-bold text-center text-gray-800">Add New Practice</h2>
      {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input type="text" placeholder="Practice Name" className="w-full p-3 border border-gray-300 rounded-lg"
          value={practice.name} onChange={(e) => setPractice({ ...practice, name: e.target.value })} required />

        <input type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded-lg"
          value={practice.address} onChange={(e) => setPractice({ ...practice, address: e.target.value })} required />

        <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg"
          value={practice.city} onChange={(e) => setPractice({ ...practice, city: e.target.value })} required />

        <input type="text" placeholder="Contact" className="w-full p-3 border border-gray-300 rounded-lg"
          value={practice.phone} onChange={(e) => setPractice({ ...practice, phone: e.target.value })} required />

        <input type="url" placeholder="Website" className="w-full p-3 border border-gray-300 rounded-lg"
          value={practice.website} onChange={(e) => setPractice({ ...practice, website: e.target.value })} />

        <select className="w-full p-3 border border-gray-300 rounded-lg"
          value={selectedSpecialityId} onChange={(e) => setSelectedSpecialityId(e.target.value)} required>

          <option value="">Select Speciality</option>
          {specialities.map((spec) => (
            <option key={spec.specialityId} value={spec.specialityId}>{spec.specialityName}</option>
          ))}
        </select>
        <div className="relative">
          <button type="button" className="w-full bg-gray-200 p-3 border border-gray-300 rounded-lg"
            onClick={() => setShowDoctors(!showDoctors)}>Select Doctors</button>
          {showDoctors && (
            <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 p-3 shadow-lg max-h-40 overflow-auto">
              {doctors.map((doctor) => (
                <label key={doctor.doctorId} className="flex items-center p-2 cursor-pointer">
                  <input type="checkbox" value={doctor.doctorId}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSelectedDoctors((prev) =>
                        prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
                      );
                    }}
                    checked={selectedDoctors.includes(doctor.doctorId)}
                  />
                  <span className="ml-2">{doctor.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4">
          Add Practice
        </button>
      </form>
    </div>
  );
}

export default AddPracticePage;
