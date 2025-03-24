import React, { useContext, useState } from "react";
import "../../stylesheets/FoodItems/FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "./FoodItem";
import Skeleton from "./Skeleton";

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(StoreContext);
  const [itemsToShow, setItemsToShow] = useState(8);

  // Filter the food_list based on the selected category
  const filteredFoodList = food_list.filter((item) =>
    category === "All" ? true : item.category === category
  );

  // Slice the filtered list to show only the required number of items
  const displayedItems = filteredFoodList.slice(0, itemsToShow);

  const handleExploreMore = () => {
    setItemsToShow((prev) => prev + 8);
  };

  return (
    <div className="container food-display" id="food-display">
      <div className="mb-5 section-title text-center">
        <h2>Top dishes near you</h2>
        <p style={{ color: "var(--textLight)" }}>Explore our menu</p>
      </div>

      {loading || displayedItems.length === 0 ? (
        <>
          <div className="food-display-list">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} index={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="food-display-list">
            {displayedItems.map(
              (item, index) =>
                item.available && (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                )
            )}
          </div>

          {itemsToShow < filteredFoodList.length && (
            <div className="explore-more-btn">
              <button onClick={handleExploreMore}>Show More</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FoodDisplay;
