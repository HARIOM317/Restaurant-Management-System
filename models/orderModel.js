import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  discount: { type: String, required: false },
  discount_amount: { type: Number, required: false },
  is_instagram_follower: { type: Boolean, required: false },
  instagram_discount: { type: String, required: false },
  instagram_discount_amount: { type: Number, required: false },
}, { timestamps: true });

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
