import React, { useContext } from "react";
import "../../stylesheets/FoodItems/FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { API_URL } from "../../store/apiUrl";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image }) => {
  const navigate = useNavigate();

  const foodImagesUrl = `${API_URL}/images/`;

  const { cartItems, addToCart, removeFromCart, token } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={foodImagesUrl + image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => (token ? addToCart(id) : navigate("/login"))}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <span>{cartItems[id]}</span>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name">
          <h2>{name}</h2>
        </div>

        <div>
          <p className="food-item-description">{description}</p>
        </div>

        <div>
          <p className="food-item-price">Rs. {price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
