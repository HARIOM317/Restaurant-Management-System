import React from "react";
import img1 from "../../assets/about/1.png";
import img2 from "../../assets/about/2.png";
import img3 from "../../assets/about/3.png";
import img4 from "../../assets/about/4.png";
import "../../stylesheets/Home/About.css";

const About = () => {
  return (
    <>
      <section className="announcements">
        <div className="section-title text-center">
          <h2>Why You'll Love Sky Hut?</h2>
          <p style={{ color: "var(--textLight)" }}>
          There are so many reasons to prefer Sky Hut in Bhopal
          </p>
        </div>

        <div className="paddings innerWidth flexCenter announce-container">
          <div className="announceCard">
            <img src={img1} alt="" />
            <h3>Delicious Taste</h3>
            <p>
            Enjoy mouth-watering dishes crafted with fresh ingredients.
            </p>
          </div>
          <div className="announceCard">
            <img src={img2} alt="" />
            <h3>Professional Chefs</h3>
            <p>
            Our skilled chefs ensure every meal is a flavorful masterpiece.
            </p>
          </div>
          <div className="announceCard">
            <img src={img3} alt="" />
            <h3> Dining Tables</h3>
            <p>
            Experience our enjoyable atmosphere for dining at skyhut.
            </p>
          </div>
          <div className="announceCard">
            <img src={img4} alt="" />
            <h3>Huts</h3>
            <p>
            Dine in unique, private huts perfect for intimate gatherings.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
