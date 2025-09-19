import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup=async (req,res)=>{

    const {email,password}=req.body;
    const existingUser=await User.findOne({email});
  try {

      if(existingUser){
        res.status(409).json({message:"Email id already registered... Please signIn"})
    }else{
        const user=new User({email,password});
        await user.save();
        // console.log(email,password,"at authcontroller signup");
        return res.status(201).json({message:"User created successfully"})
    }
  } catch (error) {
         console.log(error,"Error while creating user")
         return res.status(500).json({ error:"Error while creating user"}); 
  }
}


export const signin=async (req,res)=>{

    const {email,password}=req.body;

    const existingUser=await User.findOne({email});
       if(!existingUser){
        return res.status(404).json({message:"User with this emial is not found!"})
    }

    if(password===existingUser.password){
    // Generate jwt and send to frontend cookie
    const token= jwt.sign({email:existingUser.email,password:existingUser.password},"sanauaransari",{expiresIn:"6h"});
    res.cookie('token',token);
    // console.log(token,"----token consoled at signin")
    return res.status(200).json({message:"SignIn successful",token,success:true })
    }else{
          return res.status(401).json({message:"Invalid password" })
    }
}