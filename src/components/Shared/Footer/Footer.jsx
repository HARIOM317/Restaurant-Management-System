import React from "react";
import "../../../stylesheets/Footer/Footer.css";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.icon} alt="" />
          <p style={{ color: "#7f7e91" }}>
            Naveen Restaurant and Snacks Corner
          </p>

          <div className="social-media-buttons">
            <NavLink
              to="/"
              style={{ background: "#0a63bc" }}
              className="link"
              target="_blank"
            >
              <i className="bx bxl-linkedin"></i>
            </NavLink>
            <NavLink
              to="/"
              style={{ background: "#3b5998" }}
              className="link"
              target="_blank"
            >
              <i className="bx bxl-facebook"></i>
            </NavLink>
            <NavLink
              to="/"
              style={{ background: "#db1c8a" }}
              className="link"
              target="_blank"
            >
              <i className="bx bxl-instagram"></i>
            </NavLink>
            <NavLink
              to="/"
              style={{ background: "#03a9f4" }}
              className="link"
              target="_blank"
            >
              <i className="bx bxl-twitter"></i>
            </NavLink>
          </div>
        </div>

        <div className="footer-content-center">
          <h2 className="footer-heading">Company</h2>
          <ul>
            <li>
              <NavLink to="/about">
                <FaAngleDoubleRight className="icon" /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy">
                <FaAngleDoubleRight className="icon" /> Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms-and-conditions">
                <FaAngleDoubleRight className="icon" /> Terms and Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/refund-and-cancellation-policy">
                <FaAngleDoubleRight className="icon" /> Refund and Cancellation
                Policy
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-content-center">
          <h2 className="footer-heading">Customer</h2>
          <ul>
            <li>
              <NavLink to="/myorders">
                <FaAngleDoubleRight className="icon" /> My Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                <FaAngleDoubleRight className="icon" /> Order Now
              </NavLink>
            </li>
            <li>
              <NavLink to="/services">
                <FaAngleDoubleRight className="icon" /> Organise Event
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservation">
                <FaAngleDoubleRight className="icon" /> Book Table
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2 className="footer-heading">Get in touch</h2>
          <ul>
            <li>
              <NavLink to={"/"}>
                <span className="contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </span>{" "}
                +91 9755433233
              </NavLink>
            </li>
            <li>
              <NavLink to={"mailto:support@skyhutcafe.com"}>
                <span className="contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>{" "}
                support@skyhutcafe.com
              </NavLink>
            </li>
            <li>
              <NavLink to={"mailto:support@skyhutcafe.com"}>
                <span className="contact-icon">
                  <i className="fa-solid fa-map-marker"></i>
                </span>{" "}
                New Jail Rd, Sanjeev Nagar, Navri Bhopal, MP, 462038
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2024 © SkyHut Cafe - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
