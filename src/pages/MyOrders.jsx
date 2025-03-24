import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/MyOrders.css";
import { API_URL } from "../store/apiUrl";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { Button, Modal, Form, Input, Pagination, Spin } from "antd";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [reviewedProductIds, setReviewedProductIds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      // Sorting the data (Last order at the first)
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/review/all`);
      console.log("Review data is here: ", response.data);
      const reviewedIds = response.data.map((review) => review.product_id);
      console.log("Review ids are here: ", reviewedIds);
      setReviewedProductIds(reviewedIds);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchReviews();
      const user = parseJwt(token);
      setUserId(user?.id);
    }
  }, [token]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleReview = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setRating(0); // Reset the rating when the modal is closed
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const reviewData = {
          user_id: userId,
          rating: rating,
          comment: values.comment,
          date: new Date().toISOString(),
          product_id: selectedOrderId,
          category: "order",
        };

        try {
          await axios.post(`${API_URL}/api/review/create`, reviewData, {
            headers: { token },
          });
          console.log("Review created successfully", reviewData);
          toast.success("Thanks For Your Review");
          form.resetFields();
          setIsModalVisible(false);
          setRating(0);
          fetchReviews();
        } catch (error) {
          console.log("Error creating review:", error);
        }
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    form.setFieldsValue({ rating: newRating });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Header />

      <div className="container my-orders">
        <h1>My Orders</h1>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              minHeight: "60vh",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <div className="order-container">
            {paginatedData.map((order, index) => (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />

                <p>
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <p>
                  <b>Paid</b>
                  <br /> Rs.{" "}
                  {(
                    order.amount -
                    order.discount_amount -
                    order.instagram_discount_amount +
                    40
                  ).toFixed(2)}
                </p>
                <p>Items: {order.items.length}</p>
                <p className="quantity-amount">
                  <b>Discount</b>
                  <br /> Rs.{" "}
                  {(
                    order.discount_amount + order.instagram_discount_amount
                  ).toFixed(2)}
                </p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>

                {order.status === "Delivered" &&
                !reviewedProductIds.includes(order._id) ? (
                  <Button
                    type="primary"
                    onClick={() => handleReview(order._id)}
                    className="review-btn"
                  >
                    Review
                  </Button>
                ) : order.status === "Delivered" &&
                  reviewedProductIds.includes(order._id) ? (
                  <span style={{ color: "green" }}>Reviewed</span>
                ) : order.status === "Out for Delivery" &&
                  !reviewedProductIds.includes(order._id) ? (
                  <span style={{ color: "var(--primaryHoverColor)" }}>
                    Not Delivered
                  </span>
                ) : (
                  <span style={{ color: "red" }}>Not Arrived Yet</span>
                )}

                <button className="refresh" onClick={fetchOrders}>
                  Refresh
                </button>
              </div>
            ))}
          </div>
        )}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50"]}
        />
      </div>

      <Footer />

      <Modal
        title="Submit Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please select a rating!" }]}
          >
            <StarRatings
              rating={rating}
              starRatedColor="#f4c150"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="2px"
              starEmptyColor="#e6e8eb"
              changeRating={handleRatingChange}
            />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: "Please enter a comment!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyOrders;
