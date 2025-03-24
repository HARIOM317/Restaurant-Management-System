import mongoose from "mongoose";

const OfflineOrderSchema = new mongoose.Schema({
  table_id: { type: mongoose.Schema.Types.ObjectId, ref: "table", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: { type: Array, required: true },
  status: { type: String, default: "Food Processing" },
  amount: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  discount: { type: String, required: false },
  discount_amount: { type: Number, required: false },
  order_time: { type: Date, default: Date.now },
  special_requests: { type: String },
}, { timestamps: true });

const offlineOrderModel =
  mongoose.models.offlineOrder || mongoose.model("offlineOrder", OfflineOrderSchema);

export default offlineOrderModel;
