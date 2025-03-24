import mongoose from "mongoose";

const CarouselItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const carouselModel =
  mongoose.models.carousel || mongoose.model("carousel", CarouselItemSchema);

export default carouselModel;
