import mongoose from "mongoose";

const HutSchema = new mongoose.Schema({
  hut_name: { type: String, required: true },
  capacity: { type: Number, required: true },
  is_booked: { type: Boolean, default: false },
}, { timestamps: true });

const hutModel = mongoose.model.table || mongoose.model("hut", HutSchema);

export default hutModel;
