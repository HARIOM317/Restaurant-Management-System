import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event_name: { type: String, required: true },
    description: { type: String, required: true },
    event_amount: { type: Number, default: 0 },
    event_date: { type: Date, required: true },
    event_time: { type: String, required: true },
    mobile: { type: String, required: true },
    partial_payment: { type: Boolean, default: false },
    party_size: { type: Number, required: true },
  },
  { timestamps: true }
);

const eventModel = mongoose.model.event || mongoose.model("event", EventSchema);

export default eventModel;
