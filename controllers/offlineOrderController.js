import offlineOrderModel from "../models/offlineOrderModel.js";
import userModel from "../models/userModel.js";
import { io } from "../server.js";

// Get all offline orders
const getAllOfflineOrders = async (req, res) => {
  try {
    const orders = await offlineOrderModel.find();
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Offline Orders Found" });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create an offline order
const createOfflineOrder = async (req, res) => {
  try {
    const order = await offlineOrderModel.create(req.body);

    // Emit the new offline order to all connected clients
    io.emit("newOfflineOrder", order);

    // clearing cart data
    const userId = req.body.user_id;
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Offline Order created successfully!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get an offline order by ID
const getOfflineOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await offlineOrderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Offline Order not found" });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all offline orders by user ID
const getOfflineOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await offlineOrderModel.find({ user_id: userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Offline Orders Found for this User",
      });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update an offline order
const updateOfflineOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;

    const updatedOrder = await offlineOrderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Offline Order not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Offline Order updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating offline order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete an offline order
const deleteOfflineOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await offlineOrderModel.findByIdAndDelete(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Offline Order not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Offline Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getAllOfflineOrders,
  createOfflineOrder,
  getOfflineOrderById,
  getOfflineOrdersByUserId,
  updateOfflineOrder,
  deleteOfflineOrder,
};
