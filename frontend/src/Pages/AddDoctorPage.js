import React, { useEffect, useState } from "react";
import axios from "axios";

function AddDoctorPage() {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    bio: "",
    consultationFee: "",
    city: "",
    qualifications: [], // Changed qualification to a list of strings
  });

  const [specialities, setSpecialities] = useState([]);
  const [practices, setPractices] = useState([]);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState(null);
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [newQualification, setNewQualification] = useState("");
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/speciality/allSpecialities")
      .then((response) => {
        //console.log(response.data);
        setSpecialities(response.data);
      })
      .catch((error) => console.error("Error fetching specialities:", error));

    axios
      .get("http://localhost:8080/practice/all-practices")
      .then((response) => setPractices(response.data))
      .catch((error) => console.error("Error fetching practices:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedSpecialityId) {
      setMessage("Please select a speciality .");
      return;
    }

    try {
      //console.log(`http://localhost:8080/doctor/add-doctor?specialityId=${selectedSpecialityId}&practiceIds=${selectedPractices.join(",")}`)
      const response = await axios.post(
        `http://localhost:8080/doctor/add-doctor?specialityId=${selectedSpecialityId}&practiceIds=${selectedPractices.join(
          ","
        )}`,
        doctor, // Doctor object sent as RequestBody
        { headers: { "Content-Type": "application/json" } }
      );
      //console.log(response.data);
      setMessage(`Doctor ${response.data.name} added successfully!`);
      setDoctor({
        name: "",
        email: "",
        phone: "",
        experience: "",
        bio: "",
        consultationFee: "",
        city: "",
        qualifications: [],
      });
      setSelectedSpecialityId(null);
      setSelectedPractices([]);
    } catch (error) {
      console.error("Error adding doctor:", error);
      setMessage("Error adding doctor. Please try again.");
    }
  };

  const addQualification = () => {
    if (newQualification.trim() !== "") {
      setDoctor((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()],
      }));
      setNewQualification("");
    }
  };

  const removeQualification = (index) => {
    setDoctor((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 px-6">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Doctor
        </h2>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.name}
            onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.email}
            onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.phone}
            onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Experience (in years)"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.experience}
            onChange={(e) =>
              setDoctor({ ...doctor, experience: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Doctor Bio"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.bio}
            onChange={(e) => setDoctor({ ...doctor, bio: e.target.value })}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Consultation Fee (₹)"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.consultationFee}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                consultationFee: parseFloat(e.target.value) || "",
              })
            }
            required
          />

          <input
            type="text"
            placeholder="City"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={doctor.city}
            onChange={(e) => setDoctor({ ...doctor, city: e.target.value })}
            required
          />

          {/* Qualifications Input */}
          <div className="w-full p-3 border border-gray-300 rounded-lg">
            <label className="font-bold">Qualifications: </label>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Enter qualification"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
              />
              <button
                type="button"
                onClick={addQualification}
                className="ml-2 bg-green-500 text-white px-3 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* List of Qualifications */}
            <ul className="mt-2">
              {doctor.qualifications.map((qual, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-200 rounded-lg mt-2"
                >
                  {qual}
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Speciality Dropdown */}
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={selectedSpecialityId}
            onChange={(e) => {
              //console.log(e.target.value);
              setSelectedSpecialityId(e.target.value);
            }}
            required
          >
            <option value="">Select Speciality</option>
            {specialities.map((spec) => (
              <option key={spec.specialityId} value={spec.specialityId}>
                {spec.specialityName}
              </option>
            ))}
          </select>

          {/* Practices Selection */}
          <div className="relative">
            <button
              type="button"
              className="w-full bg-gray-200 p-3 border border-gray-300 rounded-lg"
              onClick={() => setShowPracticeDropdown(!showPracticeDropdown)}
            >
              {selectedPractices.length > 0
                ? `${selectedPractices.length} Practice(s) Selected`
                : "Select Practices"}
            </button>

            {showPracticeDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 p-3 shadow-lg max-h-40 overflow-auto">
                {practices.map((practice) => (
                  <label
                    key={practice.practiceId}
                    className="flex items-center p-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={practice.practiceId}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setSelectedPractices((prev) =>
                          prev.includes(value)
                            ? prev.filter((id) => id !== value)
                            : [...prev, value]
                        );
                      }}
                      checked={selectedPractices.includes(practice.practiceId)}
                    />
                    <span className="ml-2">{practice.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorPage;
