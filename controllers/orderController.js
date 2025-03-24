import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { io } from "../server.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// To place the order
const placeOrder = async (req, res) => {
  const frontend_url = "https://www.skyhutcafe.com";
  // const frontend_url = "http://localhost:5173";

  try {
    const {
      userId,
      items,
      amount,
      address,
      discount_amount,
      is_instagram_follower,
      instagram_discount_amount,
    } = req.body;

    const totalAmount = Math.round(
      (amount - (discount_amount + instagram_discount_amount) + 40) * 100 // Amount in paise
    );

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order_id: order.id,
      amount: totalAmount,
      currency: "INR",
      frontend_url,
      orderData: {
        userId,
        items,
        amount,
        address,
        discount_amount,
        is_instagram_follower,
        instagram_discount_amount,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in placing order" });
  }
};

// To verify the order
const verifyOrder = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderData,
  } = req.body;

  // Extracting token
  const token = req.headers.token;

  if (!token) {
    console.log("No token:", token);
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Please Login Again." });
  }

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    console.log("Incomplete Data:", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    return res
      .status(400)
      .json({ success: false, msg: "Incomplete payment data!" });
  }

  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      console.log("Signature Mismatch:", {
        generated: digest,
        received: razorpay_signature,
      });

      return res
        .status(400)
        .json({ success: false, msg: "Transaction is not legit!" });
    }

    // Calculating new points
    const newPoints = Math.round(
      orderData.amount -
        (orderData.discount_amount + orderData.instagram_discount_amount) +
        40
    );

    // adding Points using add point API
    const addPointsResponse = await axios.post(
      "https://skyhutcafe.onrender.com/api/points/add",
      {
        userId: orderData.userId,
        points: newPoints,
        pointsHistory: {
          type: "earn",
          points: newPoints,
          date: new Date(),
          description: `Points added for order ${razorpay_order_id}`,
        },
      },
      {
        headers: { token },
      }
    );

    if (
      !addPointsResponse.data ||
      addPointsResponse.data.message !== "Points added successfully"
    ) {
      console.log("Error in adding points:", addPointsResponse.data);
      return res
        .status(500)
        .json({ success: false, message: "Error in adding points" });
    }

    // save the order
    const newOrder = new orderModel(orderData);
    newOrder.payment = true;
    await newOrder.save();

    // clear the cart
    await userModel.findByIdAndUpdate(orderData.userId, { cartData: {} });

    io.emit("newOrder", newOrder); // Emit the new order on successful payment

    res.json({
      success: true,
      msg: "Transaction is legit!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in verifying order" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in getting user orders" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in listing orders" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
