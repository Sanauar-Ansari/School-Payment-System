import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Navbar from './components/Navbar'
import Transactions from './pages/Transactions'
import TransactionsBySchool from './pages/TransactionsBySchool'
import TransactionStatus from './pages/TransactionStatus'
import ProtectedRoute from '../ProtectedRoute'

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
    <BrowserRouter>
    {
      token? <Navbar/>:""

    }
       <div className="container mt-4">
        {/* <h1 className="text-center mb-4">School Payments Dashboard</h1> */}
        <Routes >
            {
          !token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/login"/>} /> 
            </>
          )
        }


        <Route element={<ProtectedRoute/>}>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/" element={<Transactions/>} />
          <Route path="/transaction_by_school" element={<TransactionsBySchool/>} />
          <Route path="/transaction_status" element={<TransactionStatus/>} />
          {/* Once the token is available then try to go on random page then it will take you to home page only */}
          <Route path="*" element={<Navigate to="/"/>} /> 
        </Route>
       
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
