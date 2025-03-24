import React from "react";
import "../../stylesheets/Home/Gallery.css";
import { Image } from "antd";
import { sliderSettings } from "../../utils/common";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

// Gallery images
import image1 from "../../assets/GalleryImages/1.webp";
import image2 from "../../assets/GalleryImages/2.webp";
import image3 from "../../assets/GalleryImages/3.webp";
import image4 from "../../assets/GalleryImages/4.webp";
import image5 from "../../assets/GalleryImages/5.webp";
import image6 from "../../assets/GalleryImages/6.webp";
import image7 from "../../assets/GalleryImages/7.webp";
import image8 from "../../assets/GalleryImages/8.webp";

const Gallery = () => {
  const imageArray = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];
  return (
    <section className="gallery">
      <div className="text-center">
        <div className="section-title">
          <h2>Gallery</h2>
          <p style={{ color: "var(--textLight)" }}>
            These are the photos of our professional environment{" "}
          </p>
        </div>
      </div>

      <div className="paddings innerWidth">
        <Swiper {...sliderSettings}>
          {/* Buttons for slider */}
          <SliderButtons />

          {imageArray.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flexColCenter gallery-item">
                  <Image
                    src={element}
                    alt=""
                    className="w-100 gallery-slider"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;

const SliderButtons = () => {
  // useSwiper Hook
  const swiper = useSwiper();

  return (
    <div className="container slider-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
