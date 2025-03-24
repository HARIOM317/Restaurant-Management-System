import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import ExploreMenu from "../components/Home/ExploreMenu";
import FoodDisplay from "../components/FoodItems/FoodDisplay";
import { Helmet } from "react-helmet-async";
import { StoreContext } from "../context/StoreContext";

const MenuPage = () => {
  const [category, setCategory] = useState("All");

  const { setIsOfflineOrder, token } = useContext(StoreContext);

  useEffect(() => {
    setIsOfflineOrder(false);
  }, [token]);

  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>SkyHut Cafe Menu - Best Veg Food in Bhopal</title>
        <meta
          name="title"
          content="SkyHut Cafe Menu - Best Veg Food in Bhopal"
        />
        <meta
          name="description"
          content="Explore the delicious veg menu at SkyHut Cafe in Bhopal. Enjoy our wide variety of items including coffee, mocktails, salads, burgers, tandoor & snacks, maggi, paratha, Chinese, basmati dishes and many more. Get fresh food home delivery and enjoy our wide range of tasty vegetarian dishes. Perfect for family dining and online food delivery."
        />
        <meta
          name="keywords"
          content="food order, online food delivery, SkyHut cafe menu, pure veg food Bhopal"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/menu" />
      </Helmet>

      <Header />
      <div
        style={{
          marginTop: 100,
        }}
      >
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
