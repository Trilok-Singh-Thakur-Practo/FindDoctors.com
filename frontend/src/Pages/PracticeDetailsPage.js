import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PracticeDetailsPage = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const [practice, setPractice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/practice/${practiceId}`)
      .then((response) => {
        //console.log("Practice API Response:", response.data); 
        setPractice(response.data);
      })
      .catch(() => {
        setError("Practice not found");
      });
  }, [practiceId]);

  if (error)
    return <h2 className="text-center text-xl font-semibold text-red-500 mt-10">{error}</h2>;

  return (
    <div className="min-h-screen mt-11 flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-6">
      {/* Card Container */}
      <div className="bg-white max-w-3xl w-full shadow-lg rounded-2xl overflow-hidden p-6">
        {/* Practice Header */}
        <div className="flex flex-col items-center">
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsat2koHVUNO6FVXRPipg7KcnTLf26W2yvCw&s"}
            alt={practice?.name || "Practice"}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{practice?.name || "Not Available"}</h2>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Practice Info */}
        <div className="text-gray-700 space-y-4">
          <p><strong>Address:</strong> {practice?.address || "Not Available"}</p>
          <p><strong>City:</strong> {practice?.city || "Not Available"}</p>
          <p><strong>Phone:</strong> 📞 {practice?.phone || "Not Available"}</p>
          {practice?.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={practice.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {practice.website}
              </a>
            </p>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Speciality Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Speciality</h3>
          <p className="text-gray-600">
            {practice?.specialityName || "Not Available"}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Doctors Associated */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Doctors Associated</h3>
          <ul className="list-disc list-inside text-gray-600">
            {practice?.doctorNames?.length > 0 ? (
              practice.doctorNames.map((doctor, index) => (
                <li key={index}>{doctor}</li>
              ))
            ) : (
              <p className="text-gray-500">No doctors available</p>
            )}
          </ul>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Book Appointment Button */}
        <div className="flex justify-center mt-8">
          <button
            // onClick={() => navigate(`/book-appointment/${practiceId}`)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all text-lg"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PracticeDetailsPage;
