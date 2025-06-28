import React, { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", phone: "", username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      alert("Error during registration");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <input placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
