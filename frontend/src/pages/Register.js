import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

function Register() {
  const [form, setForm] = useState({ name: "", phone: "", username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(form);
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
