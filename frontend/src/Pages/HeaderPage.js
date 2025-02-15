import { Link, useNavigate, useLocation } from "react-router-dom";

export default function HeaderPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Hide header on login page
  if (location.pathname === "/login" || location.pathname === "/") {
    return null;
  }

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center">
        {/* Left - Brand */}
        <Link to="/user-home" className="text-3xl font-extrabold text-green-600">
          DocFinder 🏥
        </Link>

        {/* Center - Navigation */}
        <nav className="flex space-x-12 ml-16">
          <Link
            to="/user-home"
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-all"
          >
            Home
          </Link>
          <Link
            to="/doctor/search-doctor"
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-all"
          >
            All Doctors
          </Link>
          <Link
            to="/practice/search-practice"
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-all"
          >
            All Hospitals
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 text-white text-lg px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
