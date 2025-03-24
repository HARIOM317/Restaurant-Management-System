import React from "react";
import Header from "../components/Shared/Header/Header";

const RefundAndCancellationPolicy = () => {
  return (
    <>
      <Header />
      <section id="refund-cancellation-policy">
        <div className="container mt-5 pt-5">
          <h1 style={{ fontSize: "1.5rem" }}>Refund and Cancellation Policy</h1>
          <p>Last Updated: August 14, 2024</p>

          <h2 style={{ fontSize: "1.25rem" }}>1. No Refund Policy</h2>
          <p>
            At SkyHut Cafe, we strive to provide the best possible experience for our customers. 
            However, please be aware that all purchases, including food orders and event registration fees, are final. 
            We do not offer any refunds once an order or reservation has been placed.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>2. Cancellation Policy</h2>
          <p>
            While we understand that plans can change, SkyHut Cafe has a strict no-cancellation policy 
            for orders and event registrations. Once you have confirmed your order or registered for an event, 
            cancellations will not be accepted, and no refunds will be provided.
          </p>

          <h3 style={{ fontSize: "1.1rem" }}>a. Orders</h3>
          <p>
            After an order has been placed through our website or at the cafe, it cannot be canceled. 
            Please carefully review your order before confirming it.
          </p>

          <h3 style={{ fontSize: "1.1rem" }}>b. Event Registrations</h3>
          <p>
            All event registrations at SkyHut Cafe require a non-refundable fee. 
            In the event of non-attendance, the registration fee will not be refunded or transferred.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>3. Modifications to Orders</h2>
          <p>
            If you need to modify your order, please contact us immediately after placing it. 
            While we will do our best to accommodate requests, modifications are not guaranteed and are subject to approval by SkyHut Cafe.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>4. Contact Us</h2>
          <p>
            If you have any questions regarding our Refund and Cancellation Policy, please contact us at:
          </p>
          <address>
            SkyHut Cafe<br />
            New Jail Rd, Sanjeev Nagar, Navri <br />
            Bhopal, MP, 462038<br />
            Email: support@skyhutcafe.com<br />
            Phone: +91-9755433233
          </address>
        </div>
      </section>
    </>
  );
};

export default RefundAndCancellationPolicy;
