import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [showAlert, setShowAlert] = useState(true);
  const user = localStorage.getItem("user");
  const location = useLocation();

  useEffect(() => {
    if (!user && showAlert) {
      alert("You are logged out. Please login first.");
      setShowAlert(false);
    }
  }, [user, showAlert]);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
