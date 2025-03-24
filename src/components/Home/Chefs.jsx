import img1 from "../../assets/chefs/1.webp";
import img2 from "../../assets/chefs/2.webp";
import img3 from "../../assets/chefs/3.webp";
import img4 from "../../assets/chefs/4.webp";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const Chefs = () => {
  const chefArray = [
    { title: "Chef 1", img: img1 },
    { title: "Chef 2", img: img2 },
    { title: "Chef 3", img: img3 },
    { title: "Chef 4", img: img4 },
    
  ];
  return (
    <div className="d-flex justify-content-center align-items-center gap-4">
      <Swiper
        spaceBetween={2}
        slidesPerView={3}
        modules={[Navigation, Autoplay]}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          280: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          460: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        }}
      >
        {chefArray.map((item) => (
          <SwiperSlide key={item.title} className="my-2">
            <div className="feature-item text-center">
              <img src={item.img} className="img-fluid" alt="" />
              <p>{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Chefs;
