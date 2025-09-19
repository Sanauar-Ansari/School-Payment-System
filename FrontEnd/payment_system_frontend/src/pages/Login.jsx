import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Login = () => {
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {
      email,
      password,
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      window.location.reload();
      navigate("/");
    } else {
      alert(res.data.message || "Login failed");
    }
  } catch (error) {
      // Show backend message if available, otherwise fallback
      console.log(error.response)
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};

  return (
   <div className="row justify-content-center">
      <div className="col-md-4">
        <h2 className='text-center'>Login</h2>
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <div className='text-center mt-3'  >
           <p>For Login Use Following Creadentials.</p>
           <p>Email: edvironadmin@gmail.com</p>
           <p>Password: adviron123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
