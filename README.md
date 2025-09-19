# School Payment Management System

A full-stack **School Payment Management System** that allows schools to create payment links for students, collect payments securely via a payment gateway (Edviron), and view transaction history with **pagination support**.  

This project was built using **React.js (frontend)** and **Node.js + Express + MongoDB (backend)** with JWT authentication and webhook integration.

---

## 🚀 Features

✅ **User Authentication**
- Secure **JWT-based login/signup** for school admins.  
- Protected APIs with middleware authentication.  

✅ **Payment Creation**
- Generate payment links for students by entering their details (name, email, ID, amount).  
- Integrates with **Edviron Payment Gateway** (test environment).  

✅ **Webhook Handling**
- Automatically updates payment status (success/failure) in the database when the gateway sends callback.  

✅ **Transaction Management**
- Displays all transactions with student details.  
- **Pagination support** (`?page=1&limit=10`).  
- Allows filtering transactions by **School ID**.

✅ **Responsive UI**
- Built with React + Bootstrap for a clean and simple UI.  
- Includes success messages, alerts, and hover animations for better UX.  

---

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **Database** | **Other** |
|-------------|-------------|-------------|-----------|
| React.js | Node.js + Express.js | MongoDB (Mongoose) | JWT (Auth) |
| Axios (API Calls) | Payment Gateway Integration (Edviron) | | Webhook Support |
| Bootstrap / Custom CSS | CORS, dotenv | | Render (Deployment) |
