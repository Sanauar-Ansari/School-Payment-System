import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const url =`mongodb+srv://${process.env.MONGODB_URL}.alykwsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Yess, MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));