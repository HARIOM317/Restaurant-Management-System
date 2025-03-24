import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reservation_type: { type: String, required: true, enum: ["table", "hut"] },
    reservation_name: { type: String, required: true },
    reservation_date: { type: Date, required: true },
    amount: { type: Number, default: 0 },
    reservation_time: { type: String, required: true },
    party_size: { type: Number, required: true },
    partial_payment: { type: Boolean, default: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "canceled", "complete"],
    },
    reason: { type: String, required: false },
  },
  { timestamps: true }
);

const reservationModel =
  mongoose.model.reservation ||
  mongoose.model("reservation", ReservationSchema);

export default reservationModel;
