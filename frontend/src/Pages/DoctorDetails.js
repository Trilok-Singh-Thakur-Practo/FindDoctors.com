import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DoctorDetails() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("doctorId from URL:", doctorId); // Debugging log

    if (!doctorId || isNaN(doctorId)) {
      setError("Invalid doctor ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/doctor/${doctorId}`)
      .then((response) => {
        console.log("Fetched doctor details:", response.data);
        setDoctor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
        setError("Doctor not found");
        setLoading(false);
      });
  }, [doctorId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Doctor Details</h2>
      <hr />
      <h3>{doctor?.name || "Not Available"}</h3>
      <p><strong>Email:</strong> {doctor?.email || "Not Available"}</p>
      <p><strong>Phone No:</strong> {doctor?.phoneNo || "Not Available"}</p>
      <p><strong>Speciality:</strong> {doctor?.speciality?.specialityName || "Not Available"}</p>

      <p><strong>Qualifications:</strong></p>
      <ul>
        {doctor?.qualifications?.length > 0 ? (
          doctor.qualifications.map((q, index) => <li key={index}>{q}</li>)
        ) : (
          <p>Not Available</p>
        )}
      </ul>

      <p><strong>Experience:</strong> {doctor?.experience ? `${doctor.experience} years` : "Not Available"}</p>
      <p><strong>Bio:</strong> {doctor?.bio || "Not Available"}</p>
      <p><strong>Consultation Fee:</strong> ₹{doctor?.consultationFee ?? "Not Available"}</p>

      <p><strong>Practices:</strong></p>
      <ul>
        {doctor?.practices?.length > 0 ? (
          doctor.practices.map((p, index) => <li key={index}>{p}</li>)
        ) : (
          <p>Not Available</p>
        )}
      </ul>

      <p><strong>Tags:</strong></p>
      <ul>
        {doctor?.tags?.length > 0 ? (
          doctor.tags.map((tag, index) => <li key={index}>{tag}</li>)
        ) : (
          <p>None</p>
        )}
      </ul>
    </div>
  );
}

export default DoctorDetails;
