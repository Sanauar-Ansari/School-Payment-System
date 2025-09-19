import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const checkAuhentication=(req,res,next)=>{
  // Get token from Authorization header
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // extract token after "Bearer "
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, please login again..." });
  }

  // Verify token
  jwt.verify(token,"sanauaransari", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Forbidden" });
    }
    req.User = decoded; // attach decoded info to request
    next();
  });
}