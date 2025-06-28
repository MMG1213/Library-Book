import React, { useEffect, useState } from "react";
function MyFees() {
  const [fees, setFees] = useState([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("due_fees") || "[]");
    setFees(stored);
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#6b1e82" }}>Please Clear the Dues in Library</h2>
      {fees.length === 0 ? (
        <p style={{ textAlign: "center" }}>No pending fees.</p>
      ) : (
        <table style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "80%",
          backgroundColor: "#fef9ff",
          border: "1px solid #ddd"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#e7d4f0" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Book</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Amount (₹)</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{fee.title}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{fee.amount}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{fee.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default MyFees;
