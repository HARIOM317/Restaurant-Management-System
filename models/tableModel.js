import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  table_name: { type: String, required: true },
  capacity: { type: Number, required: true },
  is_booked: { type: Boolean, default: false },
}, { timestamps: true });

const tableModel = mongoose.model.table || mongoose.model("table", TableSchema);

export default tableModel;
