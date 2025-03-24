import React, { useState, useContext } from "react";
import "../stylesheets/Home/Service.css";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/services/1.png";
import img2 from "../assets/services/2.png";
import img3 from "../assets/services/3.png";
import img4 from "../assets/services/4.png";

import { StoreContext } from "../context/StoreContext";
import EventModal from "./EventModel";

const Service = () => {
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(img1);
  const [serviceName, setServiceName] = useState("Online Food Delivery");
  const [buttonLabel, setButtonLabel] = useState("Order Now");
  const [serviceInfo, setServiceInfo] = useState(
    "Enjoy our delicious dishes from the comfort of your home. Order now and get fresh, flavorful meals delivered straight to your doorstep."
  );

  const { token } = useContext(StoreContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handler function to update the main image and content
  const handleThumbnailClick = (image, name, info, label) => {
    setMainImage(image);
    setServiceName(name);
    setServiceInfo(info);
    setButtonLabel(label);
  };

  // Functions to handle different button actions
  const handleOrderNow = () => {
    navigate("/menu");
  };

  const handleBookTable = () => {
    navigate("/reservation");
  };

  const handleReserveHut = () => {
    navigate("/reservation");
  };

  const handleOrganizeEvent = () => {
    showModal();
  };

  const handleButtonClick = () => {
    switch (buttonLabel) {
      case "Order Now":
        handleOrderNow();
        break;
      case "Book a Table":
        handleBookTable();
        break;
      case "Reserve a Hut":
        handleReserveHut();
        break;
      case "Organize an Event":
        handleOrganizeEvent();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className="container home-services">
        <div className="service-container">
          <div className="row">
            <div className="container col-12 col-lg-6 order-lg-first order-last">
              <h1 className="title">{serviceName}</h1>
              <p className="description">{serviceInfo}</p>
              <button className="order-now" onClick={handleButtonClick}>
                {buttonLabel}
              </button>
            </div>

            {/* Main Header Right Side */}
            <div className="col-12 col-lg-6 order-md-first order-sm-first right-content">
              <img
                src={mainImage}
                alt="Delicious Food"
                className="food-image"
              />
            </div>
          </div>
        </div>

        <div className="food-thumbnails">
          <div className="service-card">
            <img
              src={img1}
              alt="Food Thumbnail 1"
              onClick={() =>
                handleThumbnailClick(
                  img1,
                  "Online Food Delivery",
                  "Enjoy our delicious dishes from the comfort of your home. Order now and get fresh, flavorful meals delivered straight to your doorstep.",
                  "Order Now"
                )
              }
            />
            <div className="content">
              <h5>Online Food Delivery</h5>
            </div>
          </div>

          <div className="service-card">
            <img
              src={img2}
              alt="Food Thumbnail 2"
              onClick={() =>
                handleThumbnailClick(
                  img2,
                  "Table Booking",
                  "Reserve your table now for a delightful dining experience. Enjoy our cozy atmosphere and exceptional service.",
                  "Book a Table"
                )
              }
            />
            <div className="content">
              <h5>Table Booking</h5>
            </div>
          </div>

          <div className="service-card">
            <img
              src={img3}
              alt="Food Thumbnail 3"
              onClick={() =>
                handleThumbnailClick(
                  img3,
                  "Hut Reservation",
                  "Book a private hut for a unique and intimate dining experience. Perfect for special occasions and gatherings.",
                  "Reserve a Hut"
                )
              }
            />
            <div className="content">
              <h5>Hut Reservation</h5>
            </div>
          </div>

          <div className="service-card">
            <img
              src={img4}
              alt="Food Thumbnail 4"
              onClick={() =>
                handleThumbnailClick(
                  img4,
                  "Event Organization",
                  "Plan your next event with us for an unforgettable experience. We'll ensure a seamless and memorable occasion.",
                  "Organize an Event"
                )
              }
            />
            <div className="content">
              <h5>Event Organization</h5>
            </div>
          </div>
        </div>

        {/* Modal to organize event */}
        <EventModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />

        <hr
          style={{
            marginTop: "2rem",
            color: "var(--bgLight)",
            opacity: "0.35",
          }}
        />
      </section>
    </>
  );
};

export default Service;
