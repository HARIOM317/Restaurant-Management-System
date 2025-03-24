import React from "react";
import { Helmet } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e78610",
          },
        }}
      >
        <HelmetProvider>
          {/* For SEO */}
          <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" href="/images/icon.webp" />
            <title>SkyHut Cafe - Best Vegetarian Restaurant in Bhopal</title>
            <meta
              name="title"
              content="SkyHut Cafe - Best Vegetarian Restaurant in Bhopal"
            />
            <meta
              name="description"
              content="Discover the best vegetarian restaurant in Bhopal at SkyHut Cafe. Enjoy delicious pure veg snacks, meals, and beverages. Perfect for family outings and casual dining. Order online for quick food delivery or visit us for a memorable dining experience!"
            />
            <meta
              name="keywords"
              content="best vegetarian restaurant Bhopal, pure veg snacks Bhopal, online food delivery Bhopal, family dining Bhopal"
            />
            <link rel="canonical" href="https://www.skyhutcafe.com/" />
          </Helmet>

          <App />
        </HelmetProvider>
      </ConfigProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
