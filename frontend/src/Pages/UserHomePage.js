import { useNavigate } from "react-router-dom";

export default function UserHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 px-6">
      
      <div className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-6">
        
        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-gray-700 text-center leading-tight">
          Find Trusted Doctors & Hospitals with Ease!
        </h1>
        <p className="text-gray-700 text-lg text-center">
          Book appointments with top-rated medical professionals near you, all in just a few clicks.
        </p>

        {/* Buttons Section */}
        <div className="w-full flex flex-col items-center space-y-4">
          <button
            onClick={() => navigate("/doctor/search-doctor")}
            className="w-72 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            🔍 <span>Search Doctors</span>
          </button>

          <button
            onClick={() => navigate("/practice/search-practice")}
            className="w-72 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            🏥 <span>Search Hospitals & Clinics</span>
          </button>
        </div>

      </div>

    </div>
  );
}
