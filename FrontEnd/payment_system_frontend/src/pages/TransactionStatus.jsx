import React from 'react'
import { useState } from "react";
import axios from "axios";
const TransactionStatus = () => {
      const [orderId, setOrderId] = useState("");
      const [status, setStatus] = useState("");
      const [statusAmount, setStatusAmount] = useState("");

  const checkStatus = () => {
          const token = localStorage.getItem("token"); // get token from localStorage

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transaction_status/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}` // send token in headers
          }
        })
      .then(res => {setStatus(res.data.status),setStatusAmount(res.data.order_amount) })
      .catch(err => console.error(err));
  };
  return (
        <div className="container">
      <h2 className='mb-3'>Check Transaction Status</h2>
       {/* Search Bar */}
      <div className="input-group mb-3 d-flex gap-2" style={{ maxWidth: "400px" }}>
        <input
          className="form-control"
          placeholder="Enter custom_order_id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button className="btn btn-primary pointer-btn" onClick={checkStatus} disabled={!orderId}>Check</button>
      </div>
      {status && <div className="alert alert-info">Status: {`${status}, Amount:  ${statusAmount}/-`}</div>}
    </div>
  )
}

export default TransactionStatus
