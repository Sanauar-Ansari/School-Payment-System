import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import jwt from "jsonwebtoken";
import Order from "../models/order.js";
import OrderStatus from "../models/OrderStatus.js"

export const createPayment = async (req, res) => {
  try {
    const { school_id, student_info, amount } = req.body;

    // step 1- Create order in DB
    const order = await Order.create({
      school_id,
      student_info,
      gateway_name: "Edviron"
    });

    // step 2️- Generate JWT sign using PG Key
    const callbackUrl = `${process.env.FRONTEND_URL}/payment-callback`;
    const payload = {
      school_id,
      amount: amount.toString(),
      callback_url: callbackUrl
    };

    const sign = jwt.sign(payload, process.env.PG_KEY);

    // step 3️- Call Payment Gateway API
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


    // console.log(response.data)
    // 4️⃣ Get gateway response
    const { collect_request_id, collect_request_url } = response.data;

    // 5️⃣ (Optional) Store order status record (initially pending)
    await OrderStatus.create({
      collect_id: order._id,
      order_amount: amount,
      status: "pending",
      payment_message: "Waiting for payment",
    });

    // 6️⃣ Send payment link back to frontend
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