import React, { useState } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import "../stylesheets/OurServices.css";
import Service from "../components/Service";
import { Button } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import EventModal from "../components/EventModel";

import img1 from "../assets/services/Icons/food-delivery.png";
import img2 from "../assets/services/Icons/reservation.png";
import img3 from "../assets/services/Icons/event-booking.png";

const ServicesPage = () => {
  const navigate = useNavigate();

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

  const navigateToMenu = () => {
    navigate("/menu");
  };

  const navigateToReservation = () => {
    navigate("/reservation");
  };

  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>
          SkyHut Cafe Services - Online Food Delivery, Table & Hut Booking,
          Events & Party Organization in Bhopal
        </title>
        <meta
          name="title"
          content="SkyHut Cafe Services - Online Food Delivery, Table & Hut Booking,
          Events & Party Organization in Bhopal"
        />
        <meta
          name="description"
          content="Check out the services at SkyHut Cafe in Bhopal. We offer online food delivery, table booking, hut booking, and event and party organization. Enjoy delicious pure veg food at home or book a cozy spot for your special occasions."
        />
        <meta
          name="keywords"
          content="SkyHut Cafe services, online food delivery Bhopal, table booking Bhopal, hut booking Bhopal, event organization Bhopal, party organization Bhopal, pure veg food Bhopal"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/services" />
      </Helmet>

      <Header />

      <Service />

      <section className="container">
        <div id="service-section">
          <div className="section-title text-center">
            <h2>Our Services</h2>
            <p style={{ color: "var(--textLight)" }}>Here is our services</p>
          </div>

          <div className="my-cards">
            <div className="service-card">
              <div className="service-icon">
                <img src={img1} alt="Food Delivery" />
              </div>
              <div className="content">
                <h3>Online Food Delivery</h3>
                <p>
                Enjoy our delicious dishes from the comfort of your home. Order now and get fresh, flavorful meals delivered straight to your doorstep.
                </p>
                <Button onClick={navigateToMenu}>Order Now</Button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <img src={img2} alt="Reservation" />
              </div>

              <div className="content">
                <h3>Table and Hut Reservation</h3>
                <p>
                Reserve your table now for a delightful dining experience. Enjoy our cozy atmosphere and exceptional service.
                </p>
                <Button onClick={navigateToReservation}>
                  Book Reservation
                </Button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <img src={img3} alt="Event Booking" />
              </div>

              <div className="content">
                <h3>Offline Event Booking</h3>
                <p>
                Plan your next event with us for an unforgettable experience. We'll ensure a seamless and memorable occasion.
                </p>
                <Button onClick={showModal}>Organize Event</Button>
              </div>
            </div>
          </div>

          {/* Modal to organize event */}
          <EventModal
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ServicesPage;
