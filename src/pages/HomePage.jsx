import React, { useState, useEffect, useContext } from "react";
import TopHeader from "../components/Home/TopHeader";
import ExploreMenu from "../components/Home/ExploreMenu";
import FoodDisplay from "../components/FoodItems/FoodDisplay";
import Header from "../components/Shared/Header/Header";
import About from "../components/Home/About";
import Footer from "../components/Shared/Footer/Footer";
import Gallery from "../components/Home/Gallery";
import TopSlider from "../components/Home/TopSlider";
import Testimonial from "../components/Home/Testimonial";
import HeroSection from "../components/Home/HeroSection";
import DeveloperFooterBar from "../components/Shared/Footer/DeveloperFooterBar";
import FAQs from "../components/Home/FAQs";
import OurChefs from "../components/Home/OurChefs";
import ChatbotWidget from "../components/chatbot/ChatbotWidget";
import { StoreContext } from "../context/StoreContext";
StoreContext;

const HomePage = () => {
  const [category, setCategory] = useState("All");

  const { setIsOfflineOrder, token } = useContext(StoreContext);

  useEffect(() => {
    setIsOfflineOrder(false);
  }, [token]);

  return (
    <>
      <Header />
      <TopSlider />
      <HeroSection />
      <About />
      <TopHeader />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <OurChefs />
      <Gallery />
      <Testimonial />
      <FAQs />
      <Footer />
      <DeveloperFooterBar />
      <ChatbotWidget />
    </>
  );
};

export default HomePage;
