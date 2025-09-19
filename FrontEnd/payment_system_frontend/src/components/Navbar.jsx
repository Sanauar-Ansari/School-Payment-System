import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
     const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
     window.location.reload();
  };
  return (
    <>
    {/* <!-- Navbar --> */}
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    {/* <!-- Logo / Brand --> */}
    <a className="navbar-brand fs-3" href="/">Edviron SchoolPay</a>

    {/* <!-- Toggler (Hamburger Menu) --> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* <!-- Navbar Links --> */}
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto ">
            <li className="fs-5"><Link className="nav-link" to="/">All Transactions</Link></li>
            <li className="fs-5"><Link className="nav-link" to="/transaction_by_school">Transactions By Schhol</Link></li>
            <li className="fs-5"><Link className="nav-link" to="/transaction_status">Check Status</Link></li>
          </ul>
    </div>

      <div className="d-flex">
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
