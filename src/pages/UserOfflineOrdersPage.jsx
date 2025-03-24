import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { Table, Spin, Button, Modal, Input } from "antd";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { API_URL } from "../store/apiUrl";
import { toast } from "react-toastify";
import moment from "moment";
import "../stylesheets/UserOfflineOrders.css";

const UserOfflineOrdersPage = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reviewedProductIds, setReviewedProductIds] = useState([]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const fetchOfflineOrders = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/offlineOrder/getByUserId/${userId}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.order_time) - new Date(a.order_time)
        );
        setOrders(sortedOrders);
      } else {
        console.error("Failed to fetch offline orders");
      }
    } catch (error) {
      console.error("Failed to fetch offline orders", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/table/allTables`, {
        headers: { token },
      });
      setTables(response.data);
      console.log("Table data = ", response.data);
    } catch (error) {
      console.error("Failed to fetch tables", error);
    }
  };

  const fetchReviews = async () => {
    const response = await axios.get(`${API_URL}/api/review/all`);
    console.log("Review data is here: ", response.data);
    const reviewedIds = response.data.map((review) => review.product_id);
    console.log("Review ids are here: ", reviewedIds);

    setReviewedProductIds(reviewedIds);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken?.id) {
        setUserId(decodedToken.id);
        fetchOfflineOrders(decodedToken.id);
        fetchTables();
        fetchReviews();
      }
    }
  }, [token]);

  const getTableName = (tableId) => {
    const table = tables.find((table) => table._id === tableId);
    return table ? table.table_name : "Unknown Table";
  };

  const getTableCapacity = (tableId) => {
    const table = tables.find((table) => table._id === tableId);
    return table ? table.capacity : "Unknown Capacity";
  };

  const handleReview = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await axios.post(
        `${API_URL}/api/review/create`,
        {
          user_id: userId,
          rating: reviewData.rating,
          comment: reviewData.comment,
          date: new Date().toISOString(),
          product_id: currentOrderId,
          category: "offline-order",
        },
        {
          headers: { token },
        }
      );

      // Update the state to include the newly reviewed product ID
      setReviewedProductIds((prevIds) => [...prevIds, currentOrderId]);

      // Reset the review data
      setReviewData({ rating: 0, comment: "" });

      toast.success("Thanks For Your Review");
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Error submitting review: ", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRatingChange = (newRating) => {
    setReviewData((prevData) => ({ ...prevData, rating: newRating }));
  };

  const handleCommentChange = (e) => {
    setReviewData((prevData) => ({ ...prevData, comment: e.target.value }));
  };

  const columns = [
    {
      title: "Table Name",
      dataIndex: "table_id",
      key: "table_id",
      width: 150,
      render: (table_id) => getTableName(table_id),
    },
    {
      title: "Table Capacity",
      dataIndex: "table_id",
      key: "table_capacity",
      width: 150,
      render: (table_id) => getTableCapacity(table_id),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      width: 250,
      render: (items) => (
        <p>
          {items.map((item) => (
            <li key={item.item_id}>
              {item.name} (x{item.quantity}) - Rs. {item.price}
            </li>
          ))}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Review",
      key: "review",
      width: 200,
      render: (text, record) => {
        if (record.status === "Delivered") {
          if (reviewedProductIds.includes(record._id)) {
            return <span style={{ color: "green" }}>Reviewed</span>;
          } else {
            return (
              <Button onClick={() => handleReview(record._id)}>Review</Button>
            );
          }
        }
        return (
          <span style={{ color: "var(--primaryColor)" }}>
            Waiting for delivery
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Header />

      <section className="container">
        <div className="user-offline-orders">
          <h1>User Offline Orders</h1>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "70vh",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={orders}
              columns={columns}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{
                x: 500,
              }}
            />
          )}
        </div>
      </section>

      <Footer />

      <Modal
        title="Submit Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <StarRatings
            rating={reviewData.rating}
            starRatedColor="#f4c150"
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="2px"
            starEmptyColor="#e6e8eb"
            changeRating={handleRatingChange}
          />
        </div>
        <div>
          <Input.TextArea
            rows={4}
            value={reviewData.comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here"
          />
        </div>
      </Modal>
    </>
  );
};

export default UserOfflineOrdersPage;
