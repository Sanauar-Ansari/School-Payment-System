# Live URL
https://schoolpaymentsystem.netlify.app/


# School Payment Management System

A full-stack **School Payment Management System** that allows schools to create payment links for students, collect payments securely via a payment gateway (Edviron), and view transaction history with **pagination support**.  

This project was built using **React.js (frontend)** and **Node.js + Express + MongoDB (backend)** with JWT authentication and webhook integration.

---

## Features

1. **User Authentication**
- Secure **JWT-based login** for school admins.  
- Protected APIs with middleware authentication.  

2. **Payment Creation**
- Generate payment links for students by entering their details (name, email, ID, amount).  
- Integrates with **Edviron Payment Gateway** (test environment).  

3. **Webhook Handling**
-  Updates payment status (success/failure) in the database when the gateway sends callback(Hit via POSTMAN).  

4. **Transaction Management**
- Displays all transactions with student details.  
- **Pagination support** (`?page=1&limit=10`).  
- Allows filtering transactions by **School ID**.

5. **Responsive UI**
- Built with React + Bootstrap for a clean and simple UI.  
- Includes success messages, alerts, and hover animations for better UX.  

---

##  Tech Stack

| **Frontend** | **Backend** | **Database** | **Other** |
|-------------|-------------|-------------|-----------|
| React.js | Node.js + Express.js | MongoDB (Mongoose) | JWT (Auth) |
| Axios (API Calls) | Payment Gateway Integration (Edviron) | | Webhook Support |
| Bootstrap / Custom CSS | CORS, dotenv | | Render (Deployment) |


## Installation & Setup

### 1 Clone the Repository
---
git clone https://github.com/your-username/school-payment-system.git
cd school-payment-system


2️ Setup Backend
cd backend
npm install


Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
PAYMENT_API_KEY=your_payment_gateway_api_key
PG_KEY=your_payment_gateway_jwt_sign_key
BACKEND_URL=https://your-backend-deployed-url


Run the backend:

npm run dev

3️ Setup Frontend
cd ../frontend
npm install
npm run dev


Open the app at http://localhost:5173

 API Endpoints
Method	Endpoint	Description
POST	/api/signup	Register a new admin user
POST	/api/signin	Login admin & get JWT token
POST	/api/create-payment	Create a new payment link (requires token)
GET	/api/transactions?page=1&limit=10	Get paginated transactions (requires token)
GET	/api/transactions/school/:schoolId	Get transactions by school
POST	/webhook	Webhook endpoint (payment gateway callback)

---

 ## Screenshots

![Image Alt](https://github.com/Sanauar-Ansari/School-Payment-System/blob/9d5856a008338dab105fc70e49d2cd1be8ad5754/login%20(2).png)

![Image Alt](https://github.com/Sanauar-Ansari/School-Payment-System/blob/8d4226079b35041adb5c1ac7362012a9176eddee/Screenshot%202025-09-20%20012400.png)

![Image Alt](https://github.com/Sanauar-Ansari/School-Payment-System/blob/8d4226079b35041adb5c1ac7362012a9176eddee/Screenshot%202025-09-20%20012320.png)

 

