import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio2.mp3";
import axios from "axios";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { API_URL } from "../../../store/apiUrl";
import { Table, Spin, Tabs } from "antd";
import moment from "moment";
import { StoreContext } from "../../../context/StoreContext";
import StarRatings from "react-star-ratings";
import { io } from "socket.io-client";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const StaffCustomerReviewPage = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new user review
    socket.current.on("newReview", (newReview) => {
      setReviews((prev) => {
        const updatedReview = [newReview, ...prev].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return updatedReview;
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

  const fetchAllCustomerReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/review/all`);
      if (response.data) {
        // Sorting the data
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedReviews;
      } else {
        console.log("Something went wrong fetching customer reviews");
        return [];
      }
    } catch (error) {
      console.log("Error in fetching customer reviews");
      return [];
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/all`, {
        headers: { token },
      });
      if (response.data.success) {
        const userMap = response.data.users.reduce((acc, user) => {
          acc[user._id] = { name: user.name, email: user.email };
          return acc;
        }, {});
        return userMap;
      } else {
        console.log("Something went wrong fetching users");
        return {};
      }
    } catch (error) {
      console.log("Error in fetching users");
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [reviewsData, usersData] = await Promise.all([
        fetchAllCustomerReviews(),
        fetchAllUsers(),
      ]);
      setReviews(reviewsData);
      setUserMap(usersData);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => {
        const user = userMap[userId];
        return user ? user.name : "Unknown";
      },
    },
    {
      title: "Email",
      dataIndex: "user_id",
      key: "email",
      render: (userId) => {
        const user = userMap[userId];
        return user ? user.email : "Unknown";
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 200,
      render: (rating) => (
        <StarRatings
          rating={rating}
          starRatedColor="#f4c150"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="5px"
        />
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 150,
      key: "date",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
  ];

  const filterReviewsByCategory = (category) => {
    return reviews.filter((review) => review.category === category);
  };

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Customer Reviews</h3>

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
          <Tabs defaultActiveKey="1">
            <TabPane tab="Order Reviews" key="1">
              <Table
                columns={columns}
                dataSource={filterReviewsByCategory("order")}
                rowKey="_id"
                scroll={{ x: 500 }}
              />
            </TabPane>
            <TabPane tab="Offline Order Reviews" key="2">
              <Table
                columns={columns}
                dataSource={filterReviewsByCategory("offline-order")}
                rowKey="_id"
                scroll={{ x: 500 }}
              />
            </TabPane>
            <TabPane tab="Reservation Reviews" key="3">
              <Table
                columns={columns}
                dataSource={filterReviewsByCategory("reservation")}
                rowKey="_id"
                scroll={{ x: 500 }}
              />
            </TabPane>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StaffCustomerReviewPage;
