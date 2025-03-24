import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio.mp3";
import "../../../stylesheets/Admin/OrdersPage.css";
import { API_URL } from "../../../store/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../assets/adminAssets/assets";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { Tabs, Pagination, Select } from "antd";
import { io } from "socket.io-client";
import moment from "moment";

const { TabPane } = Tabs;
const { Option } = Select;

const StaffOrdersPage = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const [foodProcessingOrders, setFoodProcessingOrders] = useState([]);
  const [outForDeliveryOrders, setOutForDeliveryOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const { token } = useContext(StoreContext);

  const [foodProcessingPage, setFoodProcessingPage] = useState(1);
  const [outForDeliveryPage, setOutForDeliveryPage] = useState(1);
  const [deliveredPage, setDeliveredPage] = useState(1);
  const pageSize = 20; // Update to show 10 items per page

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new order
    socket.current.on("newOrder", (newOrder) => {
      setFoodProcessingOrders((prev) => {
        const updatedOrders = [newOrder, ...prev].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        return updatedOrders;
      });
      playSound();
    });

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const playSound = () => {
    audioRef.current.play();
  };

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        const orders = response.data.data;

        // Sorting the data
        const sortedOrders = orders.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setFoodProcessingOrders(
          sortedOrders.filter((order) => order.status === "Food Processing")
        );
        setOutForDeliveryOrders(
          sortedOrders.filter((order) => order.status === "Out for Delivery")
        );
        setDeliveredOrders(
          sortedOrders.filter((order) => order.status === "Delivered")
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const statusHandler = async (value, orderId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/order/status`,
        {
          orderId,
          status: value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Food Status changed successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const renderOrderList = (
    orders,
    currentPage,
    showDropdown,
    iconAsset,
    dropdownOptions = []
  ) => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedOrders = orders.slice(startIndex, startIndex + pageSize);

    return paginatedOrders.length > 0 ? (
      paginatedOrders.map((order, index) => (
        <div key={index} className="order-item">
          <div className="status-icon">
            <img src={iconAsset} alt="Order Status Icon" className="icon" />
          </div>
          <div>
            <p className="order-item-food">
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} x {item.quantity}
                  {index !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div className="order-item-address">
              <p>{order.address.street + ", "}</p>
              <p>
                {order.address.city +
                  ", " +
                  order.address.country +
                  ", " +
                  order.address.zipCode}
              </p>
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
          </div>
          <p className="quantity-amount">Items: {order.items.length}</p>

          {showDropdown ? (
            <Select
              className="custom-select"
              value={order.status}
              onChange={(value) => statusHandler(value, order._id)}
            >
              {dropdownOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <span style={{ color: "green" }}>{order.status}</span>
          )}

          <p className="quantity-amount">
            <b>Date</b> <br />
            {moment(order.createdAt).format("DD-MM-YYYY")}
          </p>

          <p className="quantity-amount">
            <b>Instagram Follower</b> <br />
            {order.is_instagram_follower ? "Yes" : "No"}
          </p>

          <p className="quantity-amount">
            <b>Amount</b> <br />
            Rs. {order.amount.toFixed(2)}
          </p>

          <p className="quantity-amount">
            <b>paid</b> <br />
            Rs.{" "}
            {(
              order.amount -
              order.discount_amount -
              order.instagram_discount_amount +
              40
            ).toFixed(2)}
          </p>

          <p className="quantity-amount">
            <b>Total Discount</b> <br />
            Rs.{" "}
            {(order.discount_amount + order.instagram_discount_amount).toFixed(
              2
            )}
          </p>

          <p className="quantity-amount">
            <b>Delivery Charge</b> <br />
            Rs. 40
          </p>
        </div>
      ))
    ) : (
      <p>No orders available.</p>
    );
  };

  return (
    <DashboardLayout>
      <div className="order ">
        <h3>Order Page</h3>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Food Processing" key="1">
            <div className="order-list">
              {renderOrderList(
                foodProcessingOrders,
                foodProcessingPage,
                true,
                assets.food_processing,
                ["Food Processing", "Out for Delivery"]
              )}
              <Pagination
                current={foodProcessingPage}
                pageSize={pageSize}
                total={foodProcessingOrders.length}
                onChange={(page) => setFoodProcessingPage(page)}
              />
            </div>
          </TabPane>
          <TabPane tab="Out for Delivery" key="2">
            <div className="order-list">
              {renderOrderList(
                outForDeliveryOrders,
                outForDeliveryPage,
                true,
                assets.out_for_delivery,
                ["Out for Delivery", "Delivered"]
              )}
              <Pagination
                current={outForDeliveryPage}
                pageSize={pageSize}
                total={outForDeliveryOrders.length}
                onChange={(page) => setOutForDeliveryPage(page)}
              />
            </div>
          </TabPane>
          <TabPane tab="Delivered" key="3">
            <div className="order-list">
              {renderOrderList(
                deliveredOrders,
                deliveredPage,
                false,
                assets.delivered
              )}
              <Pagination
                current={deliveredPage}
                pageSize={pageSize}
                total={deliveredOrders.length}
                onChange={(page) => setDeliveredPage(page)}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffOrdersPage;
