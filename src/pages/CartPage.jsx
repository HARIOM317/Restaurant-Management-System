import React, { useContext, useState, useEffect } from "react";
import "../stylesheets/Cart/Cart.css";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../store/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { Image, Table } from "antd";
import Tesseract from "tesseract.js";

const Cart = () => {
  const foodImageUrl = `${API_URL}/images/`;

  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    token,
    promoCode,
    setPromoCode,
    setDiscount,
    discountAmount,
    setDiscountAmount,
    setIsInstagramFollower,
    setInstagramDiscount,
    instagramDiscountAmount,
    setInstagramDiscountAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isFollowing, setIsFollowing] = useState(null);

  const instagramId = "sky_hut_cafe_restro";
  const instagramName = "sky hut cafe";

  const handleChange = (e) => {
    const img = e.target.files[0];
    setImage(img);
    setText(""); // Reset text state
    setIsFollowing(null); // Reset isFollowing state
    setIsChecking(true);
  };

  const extractText = async (image) => {
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
      setText(result.data.text.toLowerCase());
    } catch (error) {
      console.error("Error during OCR processing: ", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/promo/allPromos`, {
          headers: { token },
        });
        if (Array.isArray(response.data)) {
          setPromoCodes(response.data);
        } else {
          console.log("API response is not an array: ", response.data);
        }
      } catch (error) {
        console.log("Failed to fetch promo codes:", error);
      }
    };

    fetchPromoCodes();
  }, [token]);

  const handleApplyPromoCode = () => {
    const totalAmount = getTotalCartAmount();
    const promo = promoCodes.find(
      (code) =>
        code.code === promoCode &&
        new Date(code.start_date) <= new Date() &&
        new Date(code.end_date) >= new Date() &&
        code.is_active
    );

    if (promo) {
      const discountAmount = (totalAmount * promo.discount) / 100;
      setDiscount(promo.discount);
      setDiscountAmount(discountAmount);
      setPromoApplied(true);
      toast.success("Promo code applied successfully.");
    } else {
      setDiscount(0);
      setDiscountAmount(0);
      setPromoApplied(false);
      toast.error("Invalid promo code.");
    }
  };

  useEffect(() => {
    if (!promoApplied) {
      setDiscount(0);
      setDiscountAmount(0);
    }
  }, [cartItems, promoApplied]);

  useEffect(() => {
    if (image) {
      extractText(image);
    }
  }, [image]);

  useEffect(() => {
    if (text) {
      if (
        text.includes(instagramName.toLowerCase()) &&
        (text.includes(`${instagramId} following message`) ||
          text.includes(`${instagramId} following v message`))
      ) {
        setIsFollowing(true);
        setIsInstagramFollower(true);
      } else {
        setIsFollowing(false);
        setIsInstagramFollower(false);
      }
    }
  }, [text]);

  useEffect(() => {
    if (isFollowing !== null) {
      const totalAmount = getTotalCartAmount();
      if (isFollowing) {
        const discountAmount = (totalAmount * 5) / 100;
        setInstagramDiscount(5);
        setInstagramDiscountAmount(discountAmount);
        toast.success("Yahh, You are our instagram follower.");
      } else {
        setDiscount(0);
        setInstagramDiscountAmount(0);
        toast.warning("Please follow Sky Hut on Instagram to get Discount.");
      }
    }
  }, [isFollowing]);

  const columns = [
    {
      title: "Items",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (text, record) => (
        <Image src={foodImageUrl + record.image} alt="Food Item" width={60} />
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => `Rs. ${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 120,
      render: (text, record) => `Rs. ${record.price * record.quantity}`,
    },
    {
      title: "Remove",
      key: "remove",
      width: 100,
      render: (text, record) => (
        <span onClick={() => removeFromCart(record._id)} className="cross">
          <i className="fa-regular fa-trash-can" style={{ color: "red" }}></i>
        </span>
      ),
    },
  ];

  const data = food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      key: item._id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id],
      _id: item._id,
    }));

  return (
    <>
      <Header />

      <div className="cart container">
        <div className="cart-items-wrapper">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName="cart-table-row"
            scroll={{
              x: 500,
            }}
          />
        </div>

        <hr />

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>Rs. {getTotalCartAmount()}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Discount</p>
                <p>Rs. {discountAmount.toFixed(2)}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs. {getTotalCartAmount() === 0 ? "0" : "40"}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Instagram Discount</p>
                <p>Rs. {instagramDiscountAmount.toFixed(2)}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Total</p>
                <p>
                  Rs.{" "}
                  {getTotalCartAmount() === 0
                    ? getTotalCartAmount()
                    : (
                        getTotalCartAmount() -
                        discountAmount -
                        instagramDiscountAmount +
                        40
                      ).toFixed(2)}
                </p>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              Proceed to checkout
            </button>
          </div>

          <div className="cart-promo-code">
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontWeight: "bold" }}>
                Get 5% Discount if you follow Sky Hut Instagram Page
              </p>
              <div style={{ position: "relative", display: "inline-block" }}>
                <input
                  type="file"
                  id="file-input"
                  style={{
                    display: "none",
                  }}
                  onChange={handleChange}
                  disabled={promoApplied}
                />
                <label
                  htmlFor="file-input"
                  style={{
                    backgroundColor: "white",
                    color: !promoApplied ? "var(--primaryHoverColor)" : "gray",
                    padding: "10px 20px",
                    border: !promoApplied
                      ? "1.5px solid var(--primaryHoverColor)"
                      : "1.5px solid gray",
                    borderRadius: "4px",
                    cursor: !promoApplied && "pointer",
                    fontSize: "16px",
                  }}
                >
                  {isChecking ? "Checking..." : "Choose File"}
                </label>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem auto",
              }}
            >
              <span
                style={{
                  color: "var(--textColor)",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                OR
              </span>
            </div>

            <div>
              <p style={{ fontWeight: "bold" }}>
                If you have a promo code, Enter it here
              </p>
              <div
                className={
                  !isFollowing ? "cart-promo-code-input" : "disabled-promo"
                }
              >
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  disabled={isFollowing}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handleApplyPromoCode}>Apply Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
