// controllers/dashboardController.js
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import OfflineOrder from "../models/offlineOrderModel.js";
import User from "../models/userModel.js";
import Reservation from "../models/reservationModel.js";
import Review from "../models/reviewModel.js";
import Contact from "../models/contactModel.js";
import Promo from "../models/promoModel.js";
import Event from "../models/eventModel.js";

const getDashboardData = async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await Order.countDocuments();

    // Total revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total number of offline orders
    const totalOfflineOrders = await OfflineOrder.countDocuments();

    // Total revenue from offline orders
    const totalOfflineRevenue = await OfflineOrder.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Number of new customers in the last 30 days
    const newCustomers = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      role: "customer",
    });

    // Popular menu items
    const popularItems = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    // Upcoming reservations/events
    const upcomingEvents = await Reservation.find({
      reservation_date: { $gte: new Date() },
    })
      .sort({ reservation_date: 1 })
      .limit(5);

    // Total number of customers
    const totalCustomers = await User.countDocuments({ role: "customer" });

    // Sales today (assuming orders with createdAt today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const salesToday = await Order.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Monthly sales
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlySales = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Yearly sales
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const yearlySales = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOfflineOrders,
      totalOfflineRevenue: totalOfflineRevenue[0]?.total || 0,
      newCustomers,
      totalCustomers,
      salesToday: salesToday[0]?.total || 0,
      monthlySales: monthlySales[0]?.total || 0,
      yearlySales: yearlySales[0]?.total || 0,
      popularItems,
      recentOrders,
      upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

// Helper function to get the start date based on the report type
const getStartDate = (reportType) => {
  const today = new Date();
  switch (reportType) {
    case "weekly":
      return new Date(today.setDate(today.getDate() - 7));
    case "monthly":
      return new Date(today.setMonth(today.getMonth() - 1));
    case "yearly":
      return new Date(today.setFullYear(today.getFullYear() - 1));
    default:
      return new Date(today.setFullYear(today.getFullYear() - 1)); // Default to yearly
  }
};

const generateHTMLReport = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 20px;
      color: #e78610;
      width: 100%;
    }
    h3 {
      color: #e78610;
      border-bottom: 2px solid #e78610;
      padding-bottom: 5px;
      font-size: 1.15rem;
      font-weight: 500
    }
    .metrics {
      margin-bottom: 20px;
    }
    .metrics p {
      margin: 5px 0;
    }
    .metrics ul {
      padding-left: 20px;
    }
    .metrics ul li {
      margin-bottom: 5px;
    }
    .summary {
      margin-top: 30px;
      padding: 5px;
      color: #302e4d;
      border-radius: 5px;
    }
    .header-image {
      width: 100%;
      border-radius: 10px 10px 0 0;
      margin-bottom: 1rem;
    }
    .summary p {
      margin: 10px 0;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://i.ibb.co/Fx3Gnq4/report-banner.png" alt="Restaurant Image" class="header-image">
    <p><strong>Title:</strong> SkyHut Cafe ${data.reportType} Report</p>
    <p><strong>Date:</strong> ${data.date}</p>

    <div class="metrics">
      <h3>Customer Metrics</h3>
      <p>Total Registered Customers: ${data.totalCustomers}</p>
      <p>Active Customers: ${data.activeCustomers}</p>
      <p>New Customers: ${data.newCustomers}</p>
      <p>Returning Customers: ${data.returningCustomers}</p>
    </div>

    <div class="metrics">
      <h3>Reservation and Event Metrics</h3>
      <p>Total Reservations: ${data.recentReservations}</p>
      <p>Total Events Booked: ${data.upcomingEvents}</p>
      <p>Cancellations: ${data.cancelledReservations}</p>
    </div>

    <div class="metrics">
      <h3>Order Metrics</h3>
      <p>Total Orders: ${data.totalOrders}</p>
      <p>Offline Orders via QR Codes: ${data.totalOfflineOrders}</p>
      <p>Online Orders: ${data.totalOrders - data.totalOfflineOrders}</p>
      <p>Average Order Value: ₹${data.averageOrderValue}</p>
      <p>Discounted Orders: ${data.discountedOrders}</p>
    </div>

    <div class="metrics">
      <h3>Financial Metrics</h3>
      <p>Total Revenue: ₹${data.totalRevenue}</p>
      <p>Revenue from Reservations: ₹${data.revenueFromReservations}</p>
      <p>Revenue from Events: ₹${data.revenueFromEvents}</p>
      <p>Revenue from Offline Orders: ₹${data.totalOfflineRevenue}</p>
    </div>

    <div class="metrics">
      <h3>Staff Metrics</h3>
      <p>Total Staff Members: ${data.totalStaff}</p>
      <p>New Staff Members: ${data.newStaff}</p>
      <p>Staff Roles Distribution:</p>
      <ul>
        ${data.staffRoles
          .map(
            (role) =>
              `<li>${role._id.charAt(0).toUpperCase() + role._id.slice(1)}: ${
                role.count
              }</li>`
          )
          .join("")}
      </ul>
    </div>

    <div class="metrics">
      <h3>Customer Engagement</h3>
      <p><strong>Social Media Followers:</strong></p>
      <ul>
        <li>Instagram: N/A</li>
        <li>Facebook: N/A</li>
      </ul>
      <p>Points Redeemed by Customers: ${data.totalPointsRedeemed}</p>
      <p>Discounts Offered: ${data.activeDiscounts}</p>
    </div>

    <div class="metrics">
      <h3>Feedback and Support</h3>
      <p>Customer Feedback Received: ${data.feedbackCount}</p>
      <p>Average Feedback Rating: ${data.averageFeedbackRating}</p>
      <p>Contact Us Queries: ${data.contactQueries}</p>
    </div>

    <div class="metrics">
      <h3>Operational Metrics</h3>
      <p>Peak Hours: ${data.peakHours[0]?._id}:00 - ${
    data.peakHours[0]?._id + 1
  }:00</p>
      <p>Popular Menu Items:</p>
      <ul>
        ${data.popularItems
          .map((item) => `<li>${item._id}: ${item.count} orders</li>`)
          .join("")}
      </ul>
    </div>

    <div class="metrics">
      <h3>Discounts and Offers</h3>
      <p>Active Discounts: ${data.activeDiscounts}</p>
    </div>

    <div class="metrics">
      <h3>Additional Information</h3>
      <p>Special Notes: N/A</p>
    </div>

    <div class="summary">
      <p>Created by www.skyhutcafe.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Generate Report Method
const generateReport = async (req, res) => {
  try {
    const reportType = req.query.type || "yearly"; // default to yearly if no type is provided
    const startDate = getStartDate(reportType);
    const today = new Date();

    // Fetch data
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: startDate },
      role: "customer",
    });
    const returningCustomers = await User.aggregate([
      {
        $match: {
          role: "customer",
          $expr: { $gt: ["$lastLoginDate", "$createdAt"] },
        },
      },
      {
        $count: "returningCustomers",
      },
    ]);
    const activeCustomers = await User.countDocuments({
      lastLoginDate: { $gte: startDate },
      role: "customer",
    });

    const pointsRedeemed = await User.aggregate([
      {
        $match: {
          role: "customer",
          lastLoginDate: { $gte: startDate },
        },
      },
      {
        $unwind: "$pointsHistory",
      },
      {
        $match: {
          "pointsHistory.type": "redeem",
          "pointsHistory.date": { $gte: startDate },
        },
      },
      {
        $group: {
          _id: null,
          totalPointsRedeemed: { $sum: "$pointsHistory.points" },
        },
      },
    ]);

    const totalPointsRedeemed =
      pointsRedeemed.length > 0 ? pointsRedeemed[0].totalPointsRedeemed : 0;

    const totalOrders = await Order.countDocuments();
    const totalOfflineOrders = await OfflineOrder.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalOfflineRevenue = await OfflineOrder.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const recentReservations = await Reservation.countDocuments();
    const upcomingEvents = await Reservation.find({
      reservation_date: { $gte: new Date() },
    }).countDocuments();
    const cancelledReservations = await Reservation.countDocuments({
      status: "canceled",
    });
    const popularItems = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    const averageOrderValue = await Order.aggregate([
      { $group: { _id: null, avgOrder: { $avg: "$amount" } } },
    ]);

    const orderDiscount = await Order.countDocuments({
      discount_amount: { $gt: 5 },
    });

    const discountedOfflineOrders = await OfflineOrder.countDocuments({
      discount_amount: { $gt: 5 },
    });

    const discountedOrders = orderDiscount + discountedOfflineOrders;
    const revenueFromReservations = await Reservation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const revenueFromEvents = await Event.aggregate([
      { $group: { _id: null, total: { $sum: "$event_amount" } } },
    ]);
    const totalStaff = await User.countDocuments({
      role: { $in: ["chef", "waiter", "manager", "staff"] },
    });
    const newStaff = await User.countDocuments({
      createdAt: { $gte: startDate },
      role: { $in: ["chef", "waiter", "manager", "staff"] },
    });
    const staffRoles = await User.aggregate([
      { $match: { role: { $in: ["chef", "waiter", "manager", "staff"] } } },
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);
    const feedbacks = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    const feedbackCount = await Review.countDocuments({
      rating: { $exists: true },
    });
    const contactQueries = await Contact.countDocuments({
      message: { $exists: true },
    });
    const peakHours = await Order.aggregate([
      { $group: { _id: { $hour: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const activeDiscounts = await Promo.countDocuments({ is_active: true });

    console.log("returning customers:", returningCustomers);

    const reportData = {
      date: formatDate(new Date()),
      totalCustomers: totalCustomers,
      activeCustomers: activeCustomers,
      newCustomers: newCustomers,
      returningCustomers: returningCustomers[0]?.returningCustomers || 0,
      recentReservations: recentReservations,
      upcomingEvents: upcomingEvents,
      cancelledReservations: cancelledReservations,
      totalOrders: totalOrders,
      totalOfflineOrders: totalOfflineOrders,
      averageOrderValue: (averageOrderValue[0]?.avgOrder || 0).toFixed(2),
      discountedOrders: discountedOrders,
      totalPointsRedeemed: totalPointsRedeemed,
      totalRevenue: (totalRevenue[0]?.total || 0).toFixed(2),
      revenueFromReservations: (revenueFromReservations[0]?.total || 0).toFixed(
        2
      ),
      revenueFromEvents: (revenueFromEvents[0]?.total || 0).toFixed(2),
      totalOfflineRevenue: (totalOfflineRevenue[0]?.total || 0).toFixed(2),
      totalStaff: totalStaff,
      newStaff: newStaff,
      staffRoles: staffRoles,
      feedbackCount: feedbackCount,
      averageFeedbackRating: (feedbacks[0]?.avgRating || 0).toFixed(1),
      contactQueries: contactQueries,
      peakHours: peakHours,
      popularItems: popularItems,
      activeDiscounts: activeDiscounts,
      reportType: reportType,
    };

    const htmlReport = generateHTMLReport(reportData);

    res.status(200).send(htmlReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDashboardData, generateReport };
