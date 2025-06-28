import React, { useEffect, useState } from "react";

function Taken() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const taken = JSON.parse(localStorage.getItem("taken_books") || "[]");
    setBooks(taken);
  }, []);

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
           Books Reserved for you!
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Taken;
