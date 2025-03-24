import React from "react";
import Header from "../components/Shared/Header/Header";

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <section id="terms-and-conditions">
        <div className="container mt-5 pt-5">
          <h1 style={{ fontSize: "1.5rem" }}>Terms and Conditions</h1>
          <p>Last Updated: August 14, 2024</p>

          <h2 style={{ fontSize: "1.25rem" }}>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the SkyHut Cafe website located at{" "}
            <a href="http://skyhutcafe.com">http://skyhutcafe.com</a> ("Site"),
            you accept and agree to be bound by these Terms and Conditions. If
            you do not agree to these terms, please do not use the Site.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>2. Use of the Site</h2>
          <p>
            The Site is intended for personal, non-commercial use only. You may
            not use the Site for any unlawful purpose or in any way that could
            harm the Site or the reputation of SkyHut Cafe.
          </p>

          <h3 style={{ fontSize: "1.1rem" }}>a. User Account</h3>
          <p>
            To access certain features of the Site, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account. You agree to notify us immediately of
            any unauthorized use of your account.
          </p>

          <h3 style={{ fontSize: "1.1rem" }}>b. Reservations and Orders</h3>
          <p>
            When making a reservation or placing an order through the Site, you
            agree to provide accurate and complete information. SkyHut Cafe
            reserves the right to cancel or refuse any order or reservation for
            any reason, including errors in pricing or availability.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>3. Payment and Refunds</h2>
          <p>
            All payments made through the Site must be in Indian Rupees (INR).
            SkyHut Cafe uses secure payment gateways to process payments. By
            making a payment, you agree to the terms of the payment gateway used
            by SkyHut Cafe.
          </p>
          <p>
            Refunds will be provided according to our refund policy, which is
            available on the Site. You may be required to provide a valid reason
            for cancellation, and in some cases, refunds may be subject to
            deductions as per the policy.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>4. Promotions and Discounts</h2>
          <p>
            SkyHut Cafe may offer promotions, discounts, and special offers
            through the Site. These offers are subject to change without
            notice, and SkyHut Cafe reserves the right to modify or cancel any
            offer at any time. Specific terms and conditions may apply to each
            promotion or discount.
          </p>
          <p>
            Discounts offered for following SkyHut Cafe's Instagram page or
            during specific dates are subject to verification and may not be
            combined with other offers.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>5. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, images,
            and software, is the property of SkyHut Cafe or its content
            suppliers and is protected by Indian and international copyright
            laws. You may not reproduce, distribute, or otherwise use the
            content without express written permission from SkyHut Cafe.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>6. Limitation of Liability</h2>
          <p>
            SkyHut Cafe is not liable for any direct, indirect, incidental,
            special, or consequential damages arising out of or in connection
            with your use of the Site. This includes, but is not limited to,
            damages for loss of profits, data, or other intangible losses.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>7. Modifications to the Terms</h2>
          <p>
            SkyHut Cafe reserves the right to modify these Terms and Conditions
            at any time. Any changes will be effective immediately upon posting
            on the Site. Your continued use of the Site after any such changes
            constitutes your acceptance of the new Terms and Conditions.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>8. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of India. Any disputes arising out of or
            related to these Terms and Conditions or the Site shall be subject
            to the exclusive jurisdiction of the courts located in Bhopal, Madhya
            Pradesh.
          </p>

          <h2 style={{ fontSize: "1.25rem" }}>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
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

export default TermsAndConditions;
