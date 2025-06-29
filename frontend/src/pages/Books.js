import React, { useEffect, useState } from "react";
import { getBooks, reserveBook } from "../api/api";
import { useNavigate } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [copiesMap, setCopiesMap] = useState({});
  const [daysMap, setDaysMap] = useState({});
  const navigate = useNavigate();
  
  const fixedPrice = 100;
  
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getBooks();
      setBooks(res.data);
      
      const initialCopies = {};
      const initialDays = {};
      res.data.forEach((book) => {
        initialCopies[book.id] = 1;
        initialDays[book.id] = 7;
});
      setCopiesMap(initialCopies);
      setDaysMap(initialDays);
    };
    fetchBooks();
  }, []);
  
  const handleReserve = async (book) => {
    const username = JSON.parse(localStorage.getItem("user"))?.username;
    if (!username) {
      alert("You must be logged in.");
      return;
    }
    
    const copies = parseInt(copiesMap[book.id] || 1);
    const days = parseInt(daysMap[book.id] || 7);
    const totalAmount = copies * fixedPrice;
    
    try {
      const res = await reserveBook(book.id, {
        username,
        copies,
        amount: totalAmount,
      });
      
alert(`✅ Reserved "${book.title}" for ₹${totalAmount} until ${new Date(res.data.expires_on).toLocaleDateString()}`);

      const dueFees = JSON.parse(localStorage.getItem("due_fees") || "[]");
      const takenBooks = JSON.parse(localStorage.getItem("taken_books") || "[]");
      
      dueFees.push({
        title: book.title,
        amount: totalAmount,
        dueDate: new Date(res.data.expires_on).toLocaleDateString(),
      });
      
      takenBooks.push({
        title: book.title,
        copies,
        reserved_on: res.data.reserved_on,
      });
      
      localStorage.setItem("due_fees", JSON.stringify(dueFees));
      localStorage.setItem("taken_books", JSON.stringify(takenBooks));
    } catch (err) {
      alert("❌ Reservation failed. Check availability.");
    }
  };
  
  return (
  <div style={{ padding: "20px" }}>
    <h2 style={{ color: "#2a4d69", textAlign: "center" }}>📚 List of Available Books</h2>
    
      {books.length === 0 ? (
        <p style={{ textAlign: "center" }}>No books available.</p>
      ) : (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {books.map((book) => (
            <div key={book.id} style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "16px",
              margin: "10px",
              width: "300px",
              backgroundColor: "#f4faff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#0a3d62" }}>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Available:</strong> {book.available_copies} copies</p>
              <p><strong>Price per Copy:</strong> ₹{fixedPrice}</p>
              
              <label><strong>Number of Copies</strong></label>
              <input
                type="number"
                min={1}
                max={book.available_copies}
                value={copiesMap[book.id] || 1}
                onChange={(e) => setCopiesMap({ ...copiesMap, [book.id]: e.target.value })}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              
              <label><strong>Reserve For:</strong></label>
              <select
                value={daysMap[book.id] || 7}
                onChange={(e) => setDaysMap({ ...daysMap, [book.id]: e.target.value })}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {[3, 5, 7, 10, 14].map((d) => (
                  <option key={d} value={d}>{d} days</option>
                ))}
              </select>
              
              <button
                onClick={() => handleReserve(book)}
                style={{
                  backgroundColor: "#2a4d69",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2a4d69",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default Books;
