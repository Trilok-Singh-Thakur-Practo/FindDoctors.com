import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Welcome to Healthcare Search</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/doctor/search-doctor")}>
          🔍 Search Doctors
        </button>
        <button style={styles.button} onClick={() => navigate("/practice/search-practice")}>
          🏥 Search Practices
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default HomePage;
