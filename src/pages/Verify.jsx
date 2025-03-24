import React from "react";
import "../stylesheets/verify/Verify.css";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const VerifyEvent = () => {
  return (
    <>
      <Header />

      <div className="container success-container">
        <div className="success-message">
          <CheckCircleOutlined className="success-icon" />
          <h1>Payment Successful!</h1>
          <p>Your payment has been verified successfully for the event.</p>
          <Button type="primary" href="/" size="large">
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEvent;
