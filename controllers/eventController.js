import eventModel from "../models/eventModel.js";
import { io } from "../server.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// To get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to create new event
const createEvent = async (req, res) => {
  // const frontend_url = "http://localhost:5173";
  const frontend_url = "https://www.skyhutcafe.com";

  try {
    const totalAmount = 100 * 100;

    const options = {
      amount: totalAmount,
      currency: "INR",
    };

    const paymentEvent = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      event_id: paymentEvent.id,
      amount: totalAmount,
      currency: "INR",
      frontend_url,
      message: "Razorpay event created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to verify the event
const verifyEvent = async (req, res) => {
  const {
    userId,
    event_name,
    description,
    event_date,
    event_time,
    mobile,
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

    const eventData = {
      user_id: userId,
      event_name,
      description,
      event_date,
      event_time,
      mobile,
      party_size,
      event_amount: 100,
      partial_payment: true,
    };

    const event = await eventModel.create(eventData);

    io.emit("newEvent", event);

    res.json({
      success: true,
      msg: "Transaction is legit and event request sent!",
      event,
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

// to get event by its id
const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventModel.findById(id);
    return res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to update the event
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.status(200).json({
      message: "Event updated successfully.",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// to delete the event
const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    await eventModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllEvents,
  createEvent,
  verifyEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
