import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import {
  Table,
  Spin,
  Button,
  Popconfirm,
  Modal,
  Input,
  message,
  Form,
} from "antd";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { API_URL } from "../store/apiUrl";
import { toast } from "react-toastify";
import "../stylesheets/UserReservations.css";
import StarRatings from "react-star-ratings";

const UserReservationPage = () => {
  const { token } = useContext(StoreContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [form] = Form.useForm();
  const [review, setReview] = useState("");
  const [reviewedProductIds, setReviewedProductIds] = useState([]);
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);

  const [currentReservationId, setCurrentReservationId] = useState(null);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
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

  const fetchReservations = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/reservation/getByUser/${userId}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        const sortedReservations = response.data.reservations.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReservations(sortedReservations);
      } else {
        console.error("Failed to fetch reservations");
      }
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  const getReservationStatus = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/reservation/get/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        return response.data.reservation.status;
      } else {
        console.error("Failed to fetch reservation status");
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch reservation status", error);
      return null;
    }
  };

  const handleCancel = async (id) => {
    const status = await getReservationStatus(id);
    if (status === "confirmed") {
      message.error("You cannot cancel a confirmed reservation");
      return;
    }

    setCurrentReservationId(id);
    setCancelModalVisible(true);
  };

  const handleCancelSubmit = async () => {
    if (!cancelReason) {
      message.error("Please provide a reason for cancellation");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/reservation/update/${currentReservationId}`,
        { status: "canceled", reason: cancelReason },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        message.success("Reservation canceled successfully");
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation._id === currentReservationId
              ? { ...reservation, status: "canceled", reason: cancelReason }
              : reservation
          )
        );
        setCancelModalVisible(false);
        setCancelReason("");
      } else {
        console.error("Failed to cancel reservation", response.data);
        message.error("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Failed to cancel reservation", error);
      message.error("Failed to cancel reservation");
    }
  };

  const handleDelete = async (id) => {
    const status = await getReservationStatus(id);
    if (status === "confirmed") {
      message.error("You cannot delete a confirmed reservation");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/reservation/delete/${id}`,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success("Reservation deleted successfully");
        setReservations((prev) =>
          prev.filter((reservation) => reservation._id !== id)
        );
      } else {
        console.error("Failed to delete reservation");
        toast.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Failed to delete reservation", error);
      toast.error("Failed to delete reservation");
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    form.setFieldsValue({ rating: newRating });
  };

  const handleReviewSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const reviewData = {
          user_id: userId,
          rating: rating,
          comment: values.comment,
          date: new Date().toISOString(),
          product_id: currentReservationId,
          category: "reservation",
        };

        try {
          await axios.post(`${API_URL}/api/review/create`, reviewData, {
            headers: { token },
          });
          console.log("Review created successfully", reviewData);
          toast.success("Thanks For Your Review");
          form.resetFields();
          setReviewModalVisible(false);
          setRating(0);
          fetchReviews();
        } catch (error) {
          console.error("Error creating review:", error);
        }
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleReviewCancel = () => {
    setReviewModalVisible(false);
    form.resetFields();
    setRating(0); // Reset the rating when the modal is closed
  };

  useEffect(() => {
    if (token) {
      const userId = parseJwt(token)?.id;
      if (userId) {
        fetchReservations(userId);
        fetchReviews();
        setUserId(userId);
      }
    }
  }, [token]);

  const columns = [
    {
      title: "Reservation Type",
      dataIndex: "reservation_type",
      key: "reservation_type",
    },
    {
      title: "Name",
      dataIndex: "reservation_name",
      key: "reservation_name",
    },
    {
      title: "Reservation Date",
      dataIndex: "reservation_date",
      key: "reservation_date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Reservation Time",
      dataIndex: "reservation_time",
      key: "reservation_time",
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          {record.status === "pending" && (
            <Popconfirm
              title="Are you sure you want to cancel this reservation?"
              onConfirm={() => handleCancel(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Cancel
              </Button>
            </Popconfirm>
          )}
          {record.status === "canceled" && (
            <Popconfirm
              title="Are you sure you want to delete this reservation?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" style={{ color: "red" }}>
                Delete
              </Button>
            </Popconfirm>
          )}
          {record.status === "confirmed" &&
            !reviewedProductIds.includes(record._id) && (
              <span style={{ color: "var(--primaryHoverColor)" }}>
                Waiting to complete
              </span>
            )}
          {record.status === "complete" &&
            !reviewedProductIds.includes(record._id) && (
              <Button
                type="link"
                onClick={() => {
                  setCurrentReservationId(record._id);
                  setReviewModalVisible(true);
                }}
                style={{ color: "var(--primaryColor)" }}
              >
                Review
              </Button>
            )}
          {record.status === "complete" &&
            reviewedProductIds.includes(record._id) && (
              <span style={{ color: "green" }}>Reviewed</span>
            )}
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <section className="container">
        <div className="user-reservations">
          <h1>User Reservations</h1>
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
            <Table
              dataSource={reservations}
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
        title="Cancel Reservation"
        visible={cancelModalVisible}
        onOk={handleCancelSubmit}
        onCancel={() => setCancelModalVisible(false)}
      >
        <Input
          placeholder="Reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Submit Review"
        visible={reviewModalVisible}
        onOk={handleReviewSubmit}
        onCancel={handleReviewCancel}
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

export default UserReservationPage;
