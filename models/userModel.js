import mongoose from "mongoose";

const pointsHistorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String }
});

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "customer" },
  phoneNumber: { type: String },
  address: { type: addressSchema },
  profilePicture: { type: String, default: "" },
  dateOfBirth: { type: Date },
  dietaryPreferences: { type: [String], default: [] },
  favoriteDishes: { type: [String], default: [] },
  membershipStatus: { type: String, default: "Regular" },
  membershipJoinDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date, default: Date.now },
  orderHistory: { type: [String], default: [] },
  cartData: { type: Object, default: {} },
  points: { type: Number, default: 0 },
  pointsHistory: { type: [pointsHistorySchema], default: [] }
}, { minimize: false, timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
