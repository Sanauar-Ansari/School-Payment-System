import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    amount: ""
  });
  const [paymentUrl, setPaymentUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions list
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.transactions || []); // ✅ fallback to empty array
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]); //  prevent crash
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit]); //  refetch whenever page/limit changes

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create payment
  const handleCreatePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-payment`,
        {
          school_id: "65b0e6293e9f76a9694d84b4",
          student_info: {
            name: formData.name,
            id: formData.id,
            email: formData.email,
          },
          amount: formData.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentUrl(res.data.payment_url);
      setShowForm(false);
      setFormData({ name: "", id: "", email: "", amount: "" });
      fetchTransactions(); // refresh transactions
      setSuccessMessage("Payment link generated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error creating payment:", err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Transactions</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Create New Payment
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}



      {/* Per Page Input */}

     <div className="d-flex justify-content-between align-items-center mt-3">
         <label>
           Rows per page:{" "}
           <select value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}>
             <option value={5}>5</option>
             <option value={10}>10</option>
             <option value={20}>20</option>
           </select>
         </label>
         <span>Page {page} of {totalPages}</span>
       </div>

      {/* Payment Form Modal */}
      {showForm && (
        <div className="card p-3 mt-3 shadow">
          <h5>Create Payment</h5>
          <input
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            name="id"
            placeholder="Student ID"
            value={formData.id}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            name="email"
            placeholder="Student Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleCreatePayment}>
              Generate Payment Link
            </button>
          </div>
        </div>
      )}

      {/* Show Payment Link */}
      {paymentUrl && (
        <div className="alert alert-success mt-3">
          Payment link generated:
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setPaymentUrl("")}
          >
            {" "}Click to Open
          </a>
          <button
            className="btn btn-sm btn-outline-primary ms-2"
            onClick={() => navigator.clipboard.writeText(paymentUrl)}
          >
            Copy Link
          </button>
        </div>
      )}

      {/* Transactions Table */}
      <table className="table table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>Collect ID</th>
            <th>School ID</th>
            <th>Gateway</th>
            <th>Order Amount</th>
            <th>Transaction Amount</th>
            <th>Status</th>
            <th>Custom Order ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No transactions
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.collect_id} style={{ transition: "transform 0.2s" }} className="hover-row">
                <td>{tx.collect_id}</td>
                <td>{tx.order_details.school_id}</td>
                <td>{tx.order_details.gateway_name}</td>
                <td>{`₹${tx.order_amount}.00`}</td>
                <td>{`₹${tx.transaction_amount || tx.order_amount}.00`}</td>
                <td>{tx.status}</td>
                <td>{tx.order_details.student_info.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Hover Animation Styling */}
      <style>{`
        .hover-row:hover {
          transform: scale(1.02);
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default Transactions;
