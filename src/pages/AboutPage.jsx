import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import HeroSection from "../components/Home/HeroSection";
import About from "../components/Home/About";
import OurChefs from "../components/Home/OurChefs";
import Gallery from "../components/Home/Gallery";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>About SkyHut Cafe - Best Veg Restaurant in Bhopal</title>
        <meta
          name="title"
          content="About SkyHut Cafe - Best Veg Restaurant in Bhopal"
        />
        <meta
          name="description"
          content="Welcome to SkyHut Cafe, Bhopal's top veg restaurant. Enjoy tasty pure veg food in a cozy place with more than 8 huts and 30+ dining tables. Perfect for family dining, events, and parties. Experience the best veg taste in Bhopal"
        />
        <meta
          name="keywords"
          content="pure veg food Bhopal, events and parties Bhopal, family dining Bhopal,"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/about" />
      </Helmet>

      <Header />
      <div style={{ marginTop: "80px" }}>
        <HeroSection />
        <About />
        <OurChefs />
        <Gallery />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
