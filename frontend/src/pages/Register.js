import React, { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
    gender: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneValid = /^\d+$/.test(formData.phone);
    const userValid = /^[a-zA-Z0-9]+$/.test(formData.username);
    if (!phoneValid || !userValid || formData.password.length < 8) {
      alert("Invalid inputs.");
      return;
    }

    try {
      await register(formData);
      alert("Account created successfully");
      navigate("/");
    } catch {
      alert("Error during registration");
    }
  };

  return (
    <div style={{
      background: "#f0f5f9",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "350px"
      }}>
        <h2 style={{ textAlign: "center", color: "#2a4d69" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Full Name" required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
          <input placeholder="Phone (numbers only)" required
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
          <input placeholder="Username" required
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
          <input type="password" placeholder="Password (min 8 chars)" required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
          <select required
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            style={{ width: "100%", marginBottom: "20px", padding: "8px" }}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a4d69",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
