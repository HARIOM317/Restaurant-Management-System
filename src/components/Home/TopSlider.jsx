import React, { useState, useEffect } from "react";
import { API_URL } from "../../store/apiUrl";
import axios from "axios";

const TopSlider = () => {
  const allCarouselItemUrl = `${API_URL}/api/carousel/getAll`;
  const carouselImgUrl = `${API_URL}/images/`;

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(allCarouselItemUrl);
      console.log("Carousel Data: ", response.data.carouselItems);

      if (response.data.success) {
        // Filter the items to include only those with active status
        const activeItems = response.data.carouselItems.filter(
          (item) => item.active
        );
        setList(activeItems);
      } else {
        console.log("(Carousel) : Something went wrong!");
      }
    } catch (error) {
      console.log("An error occurred while fetching carousel items.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="margin-top-max">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {list.map((item, index) => (
              <div
                className={
                  index === 0
                    ? "carousel-item slider active"
                    : "carousel-item slider"
                }
                key={item._id}
              >
                <img
                  src={`${carouselImgUrl}` + item.image}
                  className="d-block w-100"
                  alt={`Discount and offer's Card`}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TopSlider;
