import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PracticeDetailsPage() {
  const { practiceId } = useParams();
  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Practice ID from URL:", practiceId); // Debugging log

    if (!practiceId || isNaN(practiceId)) {
      setError("Invalid practice ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/practice/${practiceId}`)
      .then((response) => {
        console.log("Fetched practice details:", response.data);
        setPractice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching practice details:", error);
        setError("Practice not found");
        setLoading(false);
      });
  }, [practiceId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Practice Details</h2>
      <hr />
      <h3>{practice?.name || "Not Available"}</h3>
      <p><strong>Speciality:</strong> {practice?.speciality?.specialityName || "Not Available"}</p>
      <p><strong>City:</strong> {practice?.city || "Not Available"}</p>
      <p><strong>State:</strong> {practice?.state || "Not Available"}</p>
      <p><strong>Contact:</strong> {practice?.contact || "Not Available"}</p>
      <p><strong>Website:</strong> {practice?.website ? <a href={practice.website} target="_blank" rel="noopener noreferrer">{practice.website}</a> : "Not Available"}</p>
      
      <p><strong>Doctors Associated:</strong></p>
      <ul>
        {practice?.doctors?.length > 0 ? (
          practice.doctors.map((doctor) => (
            <li key={doctor.doctorId}>
              <Link to={`/doctor/${doctor.doctorId}`} style={{ textDecoration: "none", color: "blue" }}>
                {doctor.name}
              </Link> ({doctor.speciality?.specialityName || "No Speciality"})
            </li>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </ul>

      <p><strong>Tags:</strong></p>
      <ul>
        {practice?.tags?.length > 0 ? (
          practice.tags.map((tag, index) => <li key={index}>{tag}</li>)
        ) : (
          <p>None</p>
        )}
      </ul>
    </div>
  );
}

export default PracticeDetailsPage;
