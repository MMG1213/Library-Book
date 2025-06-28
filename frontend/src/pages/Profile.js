import React, { useEffect, useState } from "react";
import { getUser } from "../api/api";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const fetchUser = async () => {
      const res = await getUser(currentUser.username);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(to right, #dfeef5, #f0f5f9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "350px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#2a4d69", marginBottom: "20px" }}>👤 My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;
