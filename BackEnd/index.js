import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import "./config/Mongoose.js"
const app=express();
import cookieParser from "cookie-parser";
import { signup ,signin} from "./controllers/authController.js";
import { checkAuhentication } from "./middleware/auth_middleware.js";
import { createPayment } from "./controllers/paymentController.js";
import { getTransactions, webhook,getTransactionsBySchool,getTransactionStatus} from "./controllers/transactionController.js";


// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://schoolpaymentsystem.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allow cookies
}));
// when Frontend send data in json then we have to parse it 
app.use(express.json());
// parse the cookie
app.use(cookieParser());


app.post("/api/signup",signup);
app.post("/api/signin",signin);
app.post("/api/create-payment", checkAuhentication, createPayment);
// Webhook is the part of payment gateway
app.post("/webhook", webhook);
// Protect transaction listing with JWT
app.get("/api/transactions", checkAuhentication, getTransactions);
app.get("/api/transactions/school/:schoolId", checkAuhentication, getTransactionsBySchool);
app.get("/api/transaction_status/:customOrderId", checkAuhentication, getTransactionStatus);
// server log
const port=process.env.PORT || 5000;
app.listen(port,(error)=>{
    if(error){
        console.error("Error while starting server:", error);
    }else{
        console.log("Server successfully running on port no.:",port)
    }
})




