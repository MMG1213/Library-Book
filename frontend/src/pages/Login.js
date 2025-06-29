import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
<<<<<<< HEAD
    <div style={{
      background: "linear-gradient(to bottom, #f0f5f9, #dfeef5)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1 style={{ color: "#2a4d69", marginBottom: "20px" }}>Library Books Reservation</h1>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        width: "320px"
      }}>
=======
    <div
      style={{
        background: "linear-gradient(to bottom, #f0f5f9, #dfeef5)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#2a4d69", marginBottom: "20px" }}>
        Library Books Reservation
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
>>>>>>> 1c31125b15d83744481c4587a8d2c3164e127bcc
        <h2 style={{ textAlign: "center", color: "#2a4d69", marginBottom: "20px" }}>
          Hi, Explore the New Books <br /> LOGIN
        </h2>

        <form onSubmit={handleLogin}>
          <input placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
          <input placeholder="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
          <button style={{ width: "100%", padding: "10px" }}>Login</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
