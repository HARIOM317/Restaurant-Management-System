import mongoose from "mongoose";

const PopupSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  image_url: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  is_active: { type: Boolean, default: true },
}, { timestamps: true });

const popupModel =
  mongoose.models.popup || mongoose.model("popup", PopupSchema);

export default popupModel;
