import React from "react";
import Header from "../components/Shared/Header/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section id="privacy-policy">
        <div className="container mt-5 pt-5">
          <h1 style={{ fontSize: "1.5rem" }}>Privacy Policy</h1>
          <p>Last Updated: August 14, 2024</p>
          <p>
            SkyHut Cafe ("we," "our," or "us") values the privacy of our
            customers and website users. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website http://skyhutcafe.com. Please read this privacy
            policy carefully. If you do not agree with the terms of this privacy
            policy, please do not access the site.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <h3 style={{ fontSize: "1.1rem" }}>a. Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping
            address, email address, and telephone number, that you voluntarily
            give to us when you register on the Site or when you choose to
            participate in various activities related to the Site, such as
            making reservations, placing orders, or subscribing to our
            newsletters.
          </p>
          <h3 style={{ fontSize: "1.1rem" }}>b. Payment Information</h3>
          <p>
            If you make a purchase or reservation on the Site, we may collect
            data necessary to process your payment, such as your payment
            instrument number (e.g., credit card number), and the security code
            associated with your payment instrument.
          </p>
          <h3 style={{ fontSize: "1.1rem" }}>c. Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the
            Site, such as your IP address, browser type, operating system,
            access times, and the pages you have viewed directly before and
            after accessing the Site.
          </p>
          <h3 style={{ fontSize: "1.1rem" }}>d. Mobile Device Data</h3>
          <p>
            Device information, such as your mobile device ID, model, and
            manufacturer, and information about the location of your device, if
            you access the Site from a mobile device.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>2. Use of Your Information</h2>
          <p>We use the information we collect in the following ways:</p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To process transactions.</li>
            <li>To send administrative information.</li>
            <li>To send marketing and promotional communications.</li>
            <li>To improve our services.</li>
          </ul>
          <h2 style={{ fontSize: "1.25rem" }}>3. Sharing of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>With service providers.</li>
            <li>For legal purposes.</li>
          </ul>
          <h2 style={{ fontSize: "1.25rem" }}>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that no method of transmission over the internet
            or method of electronic storage is completely secure, and we cannot
            guarantee absolute security.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>5. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>Access</li>
            <li>Correction</li>
            <li>Deletion</li>
          </ul>
          <p>
            To exercise these rights, please contact us at
            support@skyhutcafe.com.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>6. Third-Party Websites</h2>
          <p>
            Our Site may contain links to third-party websites. We are not
            responsible for the privacy practices or the content of those
            third-party sites. Please review their privacy policies if you
            access those links.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>7. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Any changes will be
            posted on this page with an updated revision date.
          </p>
          <h2 style={{ fontSize: "1.25rem" }}>8. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
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

export default PrivacyPolicy;
