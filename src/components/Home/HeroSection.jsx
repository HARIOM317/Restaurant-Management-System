import React from "react";
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom";
import "../../stylesheets/Home/HeroSection.css";
const HeroSection = () => {
  return (
    <>
      <section className="hero-section" style={{ marginTop: "0px" }}>
        <div className="container main-header-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side order-lg-first order-last">
              <h1 className="sky-hut-offers">
                Sky Hut Cafe Offers{" "}
                <TypeAnimation
                  className="typing"
                  sequence={[
                    "Food Delivery",
                    2000,
                    "Offline Order",
                    2000,
                    "Hut Booking",
                    2000,
                    "Party Orders",
                    2000,
                    "Table Booking",
                    2000,
                  ]}
                  wrapper="span"
                  speed={25}
                  repeat={Infinity}
                />
              </h1>

              <p className="main-header-para">
                Welcome to Sky Hut Cafe - Naveen Restaurant and Snacks Corner!
                Indulge in a delightful culinary experience at our restaurant,
                where we serve delicious and tasty food that will satisfy your
                cravings. Our welcoming atmosphere and mouth-watering dishes
                ensure a memorable dining experience every time you visit.
              </p>

              <div>
                <NavLink to={"/menu"} className="btn-get-started">
                  Order Now
                </NavLink>
              </div>
            </div>

            {/* Main Header Right Side */}
            <div className="col-12 col-lg-6 header-right-side main-header-section-images order-md-first order-sm-first">
              <iframe
                src="https://momento360.com/e/u/57a344cf196c45149bac029e9a267fc5?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"
                frameborder="0"
              ></iframe>

              <div>
                <p className="watermark">@skyhutcafe</p>
              </div>
            </div>
          </div>
        </div>

        <hr
          style={{
            height: "2px",
            marginTop: "5rem",
            color: "var(--headingColor)",
            opacity: "0.4",
          }}
        />
      </section>
    </>
  );
};

export default HeroSection;
