import React, { useState, useEffect, useContext } from "react";
import "../../stylesheets/Home/Testimonial.css";
import StarRatings from "react-star-ratings";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import user from "../../assets/user.png";
import { API_URL } from "../../store/apiUrl";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { truncate } from "../../utils/truncate";
import Lottie from "lottie-react";
import Loading from "../../animations/loading.json";
import NoData from "../../animations/no-data.json";

const Testimonial = () => {
  const { token } = useContext(StoreContext);

  const reviewUrl = `${API_URL}/api/review/all`;
  const userUrl = `${API_URL}/api/user/all`;

  const [list, setList] = useState([]);
  const [users, setUsers] = useState({});
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(reviewUrl);
      console.log("Testimonial Data: ", response.data);

      if (Array.isArray(response.data)) {
        const sortedList = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setList(sortedList);
      } else {
        console.log("(Testimonial) - Something went wrong!");
      }
    } catch (error) {
      console.log("Error fetching testimonials:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userUrl, { headers: { token } });
      console.log("User Data: ", response.data);

      if (response.data.success) {
        const usersMap = response.data.users.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      } else {
        console.log("(Testimonial Usr Fetching) - Something went wrong!");
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  if (loadingReviews && loadingUsers) {
    return (
      <>
        <div>
          <div className="section-title text-center">
            <h2>What customer says about Sky Hut?</h2>
            <p style={{ color: "var(--textLight)" }}>What Our Customer Says.</p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lottie
              loop={true}
              animationData={Loading}
              style={{ width: "300px" }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container testimonial-section">
      <div className="section-title text-center">
        <h2>What customer says about Sky Hut?</h2>
        <p style={{ color: "var(--textLight)" }}>What Our Customer Says.</p>
      </div>

      <div className="testimonial mt-5">
        {list.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              200: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              992: {
                slidesPerView: 2,
                centeredSlides: false,
              },
            }}
          >
            {list.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className="p-3 my-5 mx-0 testimonial-height"
                  style={{
                    background: "var(--bgLight)",
                    border: "1.5px solid var(--borderLight)",
                    boxShadow: "var(--materialShadowBottom)",
                    borderRadius: "8px 8px",
                  }}
                >
                  <div className="d-flex flex-column gap-2 align-items-start justify-content-between h-100">
                    <div className="review-img">
                      <img src={user} alt="" />
                      <div style={{ marginTop: "3rem", textWrap: "nowrap" }}>
                        <h5
                          className="text-secondary"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {users[item.user_id]?.name || "User"}
                        </h5>
                      </div>

                      <p
                        className="text-start text-secondary"
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        {truncate(item.comment, 100)}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: item.rating > 2 ? "green" : "red" }}>
                        {item.rating > 2 ? <FaThumbsUp /> : <FaThumbsDown />}{" "}
                        {item.rating > 2 ? "Recommended" : "Not Recommended"}
                      </p>
                      <StarRatings
                        rating={item.rating}
                        starRatedColor="#f4c150"
                        numberOfStars={5}
                        name="rating"
                        className="star"
                        starDimension="20px"
                        starSpacing="5px"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lottie
              loop={true}
              animationData={NoData}
              style={{ width: "400px", marginBottom: "3rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
