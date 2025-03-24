import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;
export const connectDB = async () => {
  await mongoose
    .connect(URI)
    .then(() => console.log("Database connected successfully!"));
};
