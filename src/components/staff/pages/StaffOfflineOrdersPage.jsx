import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio.mp3";
import { API_URL } from "../../../store/apiUrl";
import "../../../stylesheets/Admin/OrdersPage.css";
import { assets } from "../../../assets/adminAssets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { Tabs, Pagination, Select } from "antd";
import { io } from "socket.io-client";
import moment from "moment";

const { Option } = Select;

const StaffOfflineOrdersPage = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const [foodProcessingOrders, setFoodProcessingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);

  const [foodProcessingPage, setFoodProcessingPage] = useState(1);
  const [deliveredPage, setDeliveredPage] = useState(1);
  const pageSize = 10;

  const { token } = useContext(StoreContext);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new offline order
    socket.current.on("newOfflineOrder", (newOfflineOrder) => {
      setFoodProcessingOrders((prev) => {
        const updatedOrders = [newOfflineOrder, ...prev].sort(
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

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/user/all`, {
        headers: { token },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Something went wrong fetching users");
      }
    } catch (error) {
      toast.error("Something went wrong fetching users");
    }
  };

  const fetchAllTables = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/table/allTables`, {
        headers: { token },
      });
      if (response.data) {
        setTables(response.data);
      } else {
        toast.error("Something went wrong fetching tables");
      }
    } catch (error) {
      toast.error("Something went wrong fetching tables");
    }
  };

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_URL}/api/offlineOrder/allOrders`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        const orders = response.data.orders;

        // Sorting the data
        const sortedOrders = orders.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setFoodProcessingOrders(
          sortedOrders.filter((order) => order.status === "Food Processing")
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

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/offlineOrder/update/${orderId}`,
        {
          status: status,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        if (status === "Delivered") {
          toast.success("Food Delivered successfully");
        }
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllUsers();
    fetchAllTables();
  }, [token]);

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "Unknown User";
  };

  const getTableNameById = (tableId) => {
    const table = tables.find((table) => table._id === tableId);
    return table ? table.table_name : "Unknown Table";
  };

  const renderOrderList = (orders, currentPage, showDropdown, iconAsset) => {
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
            <p className="order-item-name">{getUserNameById(order.user_id)}</p>
            <p className="order-item-id">{getTableNameById(order.table_id)}</p>
            <p className="order-item-phone">{order.payment}</p>
            <p className="order-item-time">
              Order Time:{" "}
              {moment(order.order_time).format("DD-MM-YYYY HH:mm:ss")}
            </p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>Rs. {order.amount}</p>
          {showDropdown ? (
            <Select
              className="custom-select"
              onChange={(value) => statusHandler(value, order._id)}
              value={order.status}
            >
              <Option value="Food Processing">Food Processing</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
          ) : (
            <span style={{ color: "green" }}>{order.status}</span>
          )}
        </div>
      ))
    ) : (
      <p>No orders available.</p>
    );
  };

  const tabItems = [
    {
      key: "1",
      label: "Food Processing",
      children: (
        <div className="order-list">
          {renderOrderList(
            foodProcessingOrders,
            foodProcessingPage,
            true,
            assets.food_processing
          )}
          <Pagination
            current={foodProcessingPage}
            pageSize={pageSize}
            total={foodProcessingOrders.length}
            onChange={(page) => setFoodProcessingPage(page)}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Delivered",
      children: (
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
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="order">
        <h3>Offline Order Page</h3>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </DashboardLayout>
  );
};

export default StaffOfflineOrdersPage;
