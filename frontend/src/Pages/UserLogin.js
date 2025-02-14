import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle Login
      if (email === "admin@example.com" && password === "password123") {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password!");
      }
    } else {
      // Handle Registration
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      alert("User registered successfully!");
      setIsLogin(true);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New user? Register here" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;
