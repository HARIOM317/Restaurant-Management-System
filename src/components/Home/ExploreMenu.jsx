import React from "react";
import "../../stylesheets/Home/ExploreMenu.css";
import { foodAssets } from "../../assets/food-category/food-assets";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="container">
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Explore our menu and discover a world of culinary delights. From
          savory appetizers to delectable main courses, and indulgent desserts,
          each dish is crafted with the finest ingredients and a passion for
          flavor. Whether you're craving comfort food or gourmet cuisine, our
          menu offers something for everyone.
        </p>

        <div
          className="d-flex justify-content-center align-items-center gap-4 explore-menu-list"
          style={{ marginBottom: "0" }}
        >
          <Swiper
            spaceBetween={2}
            slidesPerView={3}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              200: {
                slidesPerView: 2,
              },
              440: {
                slidesPerView: 3,
              },
              560: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 5,
              },
              1100: {
                slidesPerView: 6,
              },
              1300: {
                slidesPerView: 7,
              },
              1500: {
                slidesPerView: 8,
              },
            }}
          >
            {foodAssets.map((item, index) => (
              <SwiperSlide key={item.title}>
                <div
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.menu_name ? "All" : item.menu_name
                    )
                  }
                  key={index}
                  className="explore-menu-list-item"
                >
                  <img
                    className={category === item.menu_name ? "active" : ""}
                    src={item.menu_image}
                    alt=""
                  />
                  <p>{item.menu_name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <hr />
      </div>
    </section>
  );
};

export default ExploreMenu;
