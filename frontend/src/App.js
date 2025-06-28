import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Books from "./pages/Books";
import MyFees from "./pages/MyFees";
import TakenBooks from "./pages/TakenBooks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/fees" element={<MyFees />} />
        <Route path="/taken" element={<TakenBooks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
