import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false },
  date: { type: Date, default: Date.now },
  category: { type: String, required: false, enum: ["reservation", "order", "offline-order"] },
}, { timestamps: true });

const reviewModel =
  mongoose.models.review || mongoose.model("review", ReviewSchema);

export default reviewModel;
