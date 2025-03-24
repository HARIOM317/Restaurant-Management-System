import reservationModel from "../models/reservationModel.js";
import { io } from "../server.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.find();
    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Reservations Found" });
    }
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create a reservation
const createReservation = async (req, res) => {
  // const frontend_url = "http://localhost:5173";
  const frontend_url = "https://www.skyhutcafe.com";

  try {
    const totalAmount = 100 * 100;

    const options = {
      amount: totalAmount,
      currency: "INR",
    };

    const paymentReservation = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      reservation_id: paymentReservation.id,
      amount: totalAmount,
      currency: "INR",
      frontend_url,
      message: "Razorpay order created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// verify the reservation
const verifyReservation = async (req, res) => {
  const {
    userId,
    reservation_type,
    reservation_date,
    reservation_name,
    reservation_time,
    party_size,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, msg: "Incomplete payment data!" });
  }

  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, msg: "Transaction is not legit!" });
    }

    const reservationData = {
      user_id: userId,
      reservation_type,
      reservation_date,
      reservation_name,
      reservation_time,
      party_size,
      amount: 100,
      status: "pending",
      partial_payment: true,
    };

    const reservation = await reservationModel.create(reservationData);

    io.emit("newReservation", reservation);

    res.json({
      success: true,
      msg: "Transaction is legit and reservation created!",
      reservation,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error in verifying order" });
  }
};

// Get a reservation by ID
const getReservationById = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await reservationModel.findById(id);
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
    return res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getReservationsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const reservations = await reservationModel.find({ user_id: userId });
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Reservations Found for this User",
      });
    }
    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update a reservation
const updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const updateData = req.body;

    const updatedReservation = await reservationModel.findByIdAndUpdate(
      reservationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation updated successfully.",
      reservation: updatedReservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await reservationModel.findByIdAndDelete(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getAllReservations,
  createReservation,
  verifyReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
};
