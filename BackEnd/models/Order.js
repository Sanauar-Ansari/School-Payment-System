import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
// don't need to create _id field becoz automatic create by mongoDB.
  school_id:{type:String},
  trustee_id: {type:String},
  student_info: {
    name: {type:String},
    id: {type:String},
    email: {type:String}
  },
  gateway_name: {type:String}
}, { timestamps: true });


const Order=mongoose.model("Order",orderSchema);
export default Order;

