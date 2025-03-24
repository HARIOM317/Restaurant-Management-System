import React, { useState, useContext } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import ContactSupport from "../animations/contact-us.json";
import Lottie from "lottie-react";
import "../stylesheets/Contact.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import { API_URL } from "../store/apiUrl";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import ContactPageHeader from "../components/ContactPageHeader";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const { token } = useContext(StoreContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      let response = await axios.post(`${API_URL}/api/contact/`, formData, {
        headers: { token },
      });

      if (response.status === 201) {
        toast.success("Your request sent Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        }); // Reset the form
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>Contact SkyHut Cafe - Help & Support for our customers</title>
        <meta
          name="title"
          content="Contact SkyHut Cafe - Help & Support for our customers"
        />
        <meta
          name="description"
          content="Get in touch with SkyHut Cafe in Bhopal for any help or support. Reach out for reservations, menu inquiries, or any other assistance. We're here to make your dining experience enjoyable."
        />
        <meta
          name="keywords"
          content="SkyHut Cafe contact, help and support SkyHut Cafe, Customer support, contact restaurant Bhopal"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/contact" />
      </Helmet>

      <Header />

      <ContactPageHeader />

      <section id="contact" className="contact">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              color: "var(--primaryColor)",
              fontSize: "1.75rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Contact Us
          </h3>
        </div>

        <div className="container" style={{ marginBottom: "50px" }}>
          <div className="row">
            {/* Left Side Part */}
            <div className="col-12 col-lg-5">
              <figure>
                <Lottie
                  loop={true}
                  animationData={ContactSupport}
                  className="lottie-animation"
                />
              </figure>
            </div>

            <div className="col-12 col-lg-7">
              <div className="mb-5 p-2 rounded">
                <form className="row form-row" onSubmit={handleSubmit}>
                  <div className="col-12 col-lg-6 contact-input-field">
                    <input
                      required
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-lg-6 contact-input-field">
                    <input
                      required
                      className="form-control"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 contact-input-field">
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 contact-input-field">
                    <input
                      required
                      className="form-control"
                      placeholder="Enter your subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 contact-input-field">
                    <textarea
                      required
                      className="form-control mb-3"
                      cols="30"
                      rows="10"
                      placeholder="Enter your message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="button">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="container">
            <iframe
              style={{ border: 0, width: "100%", height: "350px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10346.35498848371!2d77.37608714712164!3d23.301611563806226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c699d7247d60f%3A0x98f0b766ee8dd775!2sNAVEEN%20RESTAURANT%20%26%20SKY%20HUT%20CAFE!5e0!3m2!1sen!2sin!4v1720695247492!5m2!1sen!2sin"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUsPage;
