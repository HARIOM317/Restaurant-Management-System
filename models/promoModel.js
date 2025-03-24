import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
    useCount: { type: Number, default: 0 },
    useTotal: { type: Number, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: {
      type: String,
      required: false,
      enum: ["userSpecific", "public"],
    },
  },
  { timestamps: true }
);

const promoModel =
  mongoose.models.promo || mongoose.model("promo", PromoCodeSchema);

export default promoModel;
