import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import OrderStatus from "../models/OrderStatus.js"

export const createPayment = async (req, res) => {
  try {
    const { school_id, student_info, amount } = req.body;

    // 1st Create order in DB (every payment initiation creates a new order in DB)
    const order = await Order.create({
      school_id,
      student_info,
      gateway_name: "Edviron"
    });

    // 2️nd Use correct webhook route
    const callbackUrl = `${process.env.BACKEND_URL}/webhook`;
    // console.log("Callback URL:", callbackUrl);
    const payload = {
      school_id,
      amount: amount.toString(),
      callback_url: callbackUrl
    };

    const sign = jwt.sign(payload, process.env.PG_KEY);

    // 3️rd Call payment gateway API
    const response = await axios.post(
      "https://dev-vanilla.edviron.com/erp/create-collect-request",
      {
        school_id,
        amount: amount.toString(),
        callback_url: callbackUrl,
        sign
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`
        }
      }
    );

    const { collect_request_id, collect_request_url } = response.data;

    // 4️th  Save order status as pending. once the payment confirmed by webhook then status will be changed. 
    await OrderStatus.create({
      collect_id: order._id,
      order_amount: amount,
      status: "pending",
      payment_message: "Waiting for payment",
    });

    // 5️th Send payment link to the frontend
    res.json({
      success: true,
      order_id: order._id,
      collect_request_id,
      payment_url: collect_request_url
    });

  } catch (error) {
    console.error("Payment API Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.response?.data || error.message
    });
  }
};



