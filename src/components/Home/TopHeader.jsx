import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "../../stylesheets/Home/TopHeader.css";
import EventModal from "../EventModel";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (token) {
      setIsModalVisible(true);
    } else {
      navigate("/login");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="container">
      <div className=" top-header">
        <div className="events">
          <div className="overlay"></div>
          <div className="header-contents">
            <h2>Organize the Event Now</h2>
            <p>
            Book your event with us today for an unforgettable experience. Let us help you organize a seamless and memorable occasion.
            </p>
            <button onClick={showModal}>Book Event</button>
          </div>
        </div>
        <EventModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </div>

      <hr
        style={{
          height: "2px",
          marginTop: "2rem",
          color: "var(--textLight)",
          opacity: "0.35",
        }}
      />
    </section>
  );
};

export default TopHeader;
