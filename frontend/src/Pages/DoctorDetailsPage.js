import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorDetailsPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("doctorId from URL:", doctorId);

    if (!doctorId || isNaN(doctorId)) {
      setError("Invalid doctor ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/doctor/${doctorId}`)
      .then((response) => {
        //console.log("Fetched doctor details:", response.data);
        setDoctor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
        setError("Doctor not found");
        setLoading(false);
      });
  }, [doctorId]);

  if (loading)
    return <h2 className="text-center text-xl font-semibold text-gray-700 mt-10">Loading...</h2>;
  if (error)
    return <h2 className="text-center text-xl font-semibold text-red-500 mt-10">{error}</h2>;

  return (
    <div className="min-h-screen mt-11 flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-6">
      {/* Card Container */}
      <div className="bg-white max-w-3xl w-full shadow-lg rounded-2xl overflow-hidden p-6">
        {/* Doctor Header */}
        <div className="flex flex-col items-center">
          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt={doctor?.name || "Doctor"}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{doctor?.name || "Not Available"}</h2>
          <p className="text-blue-600 font-semibold mt-1">
            Consultation Fee: ₹{doctor?.consultationFee ?? "Not Available"}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Doctor Info */}
        <div className="text-gray-700 space-y-4">
          <p><strong>Email:</strong> {doctor?.email || "Not Available"}</p>
          <p><strong>Phone No:</strong> {doctor?.phone || "Not Available"}</p>
          <p><strong>Experience:</strong> {doctor?.experience ? `${doctor.experience} years` : "Not Available"}</p>
          <p><strong>Bio:</strong> {doctor?.bio || "Not Available"}</p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Speciality Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Speciality</h3>
          <p className="text-gray-600">
            {doctor?.specialityName || "Not Available"}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Qualifications */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualifications</h3>
          <ul className="list-disc list-inside text-gray-600">
            {doctor?.qualifications?.length > 0 ? (
              doctor.qualifications.map((q, index) => <li key={index}>{q}</li>)
            ) : (
              <p className="text-gray-500">Not Available</p>
            )}
          </ul>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Practices */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Practices</h3>
          <ul className="list-disc list-inside text-gray-600">
            {doctor?.practiceNames?.length > 0 ? (
              doctor.practiceNames.map((p, index) => <li key={index}>{p}</li>)
            ) : (
              <p className="text-gray-500">Not Available</p>
            )}
          </ul>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Tags */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {doctor?.tags?.length > 0 ? (
              doctor.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-500">None</p>
            )}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate(`/book-appointment/${doctorId}`)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all text-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetailsPage;
