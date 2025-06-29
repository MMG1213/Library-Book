import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TakenBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const taken = JSON.parse(localStorage.getItem("taken_books") || "[]");
    setBooks(taken);
  }, []);

  const handleCancel = (index) => {
    const updatedBooks = [...books];
    const removedBook = updatedBooks.splice(index, 1)[0];
    setBooks(updatedBooks);
    localStorage.setItem("taken_books", JSON.stringify(updatedBooks));

    // Also remove from fees
    const dueFees = JSON.parse(localStorage.getItem("due_fees") || "[]");
    const updatedFees = dueFees.filter((fee) => fee.title !== removedBook.title);
    localStorage.setItem("due_fees", JSON.stringify(updatedFees));

    alert(`❌ Reservation for "${removedBook.title}" has been cancelled.`);
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #dfeef5, #f0f5f9)",
      minHeight: "100vh",
      padding: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "600px"
      }}>
        <h2 style={{ color: "#2a4d69", textAlign: "center", marginBottom: "20px" }}>
          📚 Books Reserved for You
        </h2>

        {books.length === 0 ? (
          <p style={{ textAlign: "center" }}>You haven't taken any books yet.</p>
        ) : (
          books.map((book, index) => (
            <div key={index} style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0"
            }}>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Copies:</strong> {book.copies}</p>
              <p><strong>Reserved On:</strong> {new Date(book.reserved_on).toLocaleString()}</p>
              <button
                onClick={() => handleCancel(index)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginTop: "10px",
                  cursor: "pointer"
                }}
              >
                Cancel Reservation
              </button>
            </div>
          ))
        )}

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#2a4d69",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default TakenBooks;
