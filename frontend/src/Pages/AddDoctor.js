import React, { useState } from "react";

function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phoneNo: "",
    specialities: "",
    newSpeciality: "",
    qualifications: [],
    newQualification: "",
    experience: "",
    bio: "",
    consultationFee: "",
    practices: [],
    newPractice: "",
    tags: [],
    newTag: "",
  });

  const [availableSpecialities, setAvailableSpecialities] = useState([
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
  ]);

  const [availableQualifications, setAvailableQualifications] = useState([
    "MBBS",
    "MD",
    "DM",
  ]);

  const [availablePractices, setAvailablePractices] = useState([
    "Apollo Hospital",
    "Fortis Clinic",
    "Max Healthcare",
  ]);

  const [availableTags, setAvailableTags] = useState([
    "Senior Doctor",
    "Visiting Consultant",
    "Surgeon",
  ]);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e, key) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setDoctor({ ...doctor, [key]: selectedValues });
  };

  const handleAddSpeciality = () => {
    if (doctor.newSpeciality) {
      setAvailableSpecialities([...availableSpecialities, doctor.newSpeciality]);
      setDoctor({ ...doctor, specialities: doctor.newSpeciality, newSpeciality: "" });
    }
  };

  const handleAddQualification = () => {
    if (doctor.newQualification) {
      setAvailableQualifications([...availableQualifications, doctor.newQualification]);
      setDoctor({ ...doctor, qualifications: [...doctor.qualifications, doctor.newQualification], newQualification: "" });
    }
  };

  const handleAddPractice = () => {
    if (doctor.newPractice) {
      setAvailablePractices([...availablePractices, doctor.newPractice]);
      setDoctor({ ...doctor, practices: [...doctor.practices, doctor.newPractice], newPractice: "" });
    }
  };

  const handleAddTag = () => {
    if (doctor.newTag) {
      setAvailableTags([...availableTags, doctor.newTag]);
      setDoctor({ ...doctor, tags: [...doctor.tags, doctor.newTag], newTag: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Data:", doctor);
    alert("Doctor information submitted successfully!");
  };

  return (
    <div>
      <h2>Add Doctor Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone No:</label>
          <input type="text" name="phoneNo" value={doctor.phoneNo} onChange={handleChange} required />
        </div>
        <div>
          <label>Speciality:</label>
          <select name="specialities" value={doctor.specialities} onChange={handleChange} required>
            <option value="">Select Speciality</option>
            {availableSpecialities.map((sp, index) => (
              <option key={index} value={sp}>
                {sp}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add new speciality"
            value={doctor.newSpeciality}
            onChange={(e) => setDoctor({ ...doctor, newSpeciality: e.target.value })}
          />
          <button type="button" onClick={handleAddSpeciality}>
            Add Speciality
          </button>
        </div>
        <div>
          <label>Qualifications:</label>
          <select multiple value={doctor.qualifications} onChange={(e) => handleMultiSelectChange(e, "qualifications")} required>
            {availableQualifications.map((q, index) => (
              <option key={index} value={q}>
                {q}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add new qualification"
            value={doctor.newQualification}
            onChange={(e) => setDoctor({ ...doctor, newQualification: e.target.value })}
          />
          <button type="button" onClick={handleAddQualification}>
            Add Qualification
          </button>
        </div>
        <div>
          <label>Experience (Years):</label>
          <input type="number" name="experience" value={doctor.experience} onChange={handleChange} required />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={doctor.bio} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Consultation Fee:</label>
          <input type="number" name="consultationFee" value={doctor.consultationFee} onChange={handleChange} required />
        </div>
        <div>
          <label>Practices:</label>
          <select multiple value={doctor.practices} onChange={(e) => handleMultiSelectChange(e, "practices")} required>
            {availablePractices.map((pr, index) => (
              <option key={index} value={pr}>
                {pr}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add new practice"
            value={doctor.newPractice}
            onChange={(e) => setDoctor({ ...doctor, newPractice: e.target.value })}
          />
          <button type="button" onClick={handleAddPractice}>
            Add Practice
          </button>
        </div>
        <div>
          <label>Tags:</label>
          <select multiple value={doctor.tags} onChange={(e) => handleMultiSelectChange(e, "tags")}>
            {availableTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add new tag"
            value={doctor.newTag}
            onChange={(e) => setDoctor({ ...doctor, newTag: e.target.value })}
          />
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddDoctor;
