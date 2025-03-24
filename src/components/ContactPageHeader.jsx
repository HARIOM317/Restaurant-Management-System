import React from "react";
import "../stylesheets/Contact.css";

const ContactPageHeader = () => {
  return (
    <>
      <section className="contact" style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="contact-header">
            <h1>Help & Support</h1>
            <p>
              Contact SkyHut Cafe to connect with us. We're here to assist you
              with any inquiries, feedback, or bookings. Reach out via phone,
              email, or visit us in Bhopal. We're eager to hear from you!
            </p>
          </div>

          <div class="row">
            {/* <!-- Contact Info item --> */}
            <div class="contact-info-item pad-15">
              <div class="icon">
                <i class="fa fa-phone"></i>
              </div>
              <h3>Helpline Number</h3>
              <p>+91 9755433233</p>
            </div>

            {/* <!-- Contact Info item --> */}
            <div class="contact-info-item pad-15">
              <div class="icon">
                <i class="fa fa-map"></i>
              </div>
              <h3>Address</h3>
              <p>New Jail Rd, Sanjeev Nagar, Navri Bhopal, MP, India</p>
            </div>

            {/* <!-- Contact Info item --> */}
            <div class="contact-info-item pad-15">
              <div class="icon">
                <i class="fa fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>support@skyhutcafe.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPageHeader;
