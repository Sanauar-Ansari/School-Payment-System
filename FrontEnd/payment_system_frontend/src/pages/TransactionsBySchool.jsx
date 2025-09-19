import React from 'react'
import axios from "axios";
import { useState } from 'react';

const TransactionsBySchool = () => {

  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);
  // track if search clicked
  const [searched, setSearched] = useState(false); 

  const fetchBySchool = async () => {
    try {
       // get token from localStorage
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/school/${schoolId}`, {
          headers: {
            Authorization: `Bearer ${token}` // send token in headers
          }
        })
      // console.log(res.data)
      setTransactions(res.data);
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="container">
      <h2 className="mb-3">Transactions by School</h2>

      {/* Search Bar */}
      <div className="input-group mb-3 d-flex gap-2" style={{ maxWidth: "400px" }}>
        <input
          className="form-control"
          placeholder="Enter School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button
          className="btn btn-primary pointer-btn"
          onClick={fetchBySchool}
          disabled={!schoolId}
        >
          Fetch
        </button>
      </div>

      {/* Data Section */}
      {!searched && <p className="text-muted">Enter a school ID to see transactions.</p>}

      {searched && transactions.length === 0 && (
        <p className="text-danger">No transactions found for this school.</p>
      )}

      {transactions.length > 0 && (
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Collect ID</th>
              <th>Order Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.collect_id}>
                <td>{tx.collect_id}</td>
                <td>{`₹${tx.order_amount}.00`}</td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TransactionsBySchool
