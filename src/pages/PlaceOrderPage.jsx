import React, { useContext, useState, useEffect } from "react";
import "../stylesheets/PlaceOrder/PlaceOrder.css";
import { StoreContext } from "../context/StoreContext";
import { API_URL } from "../store/apiUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    discount,
    discountAmount,
    isInstagramFollower,
    instagramDiscount,
    instagramDiscountAmount,
    setCartItems,
  } = useContext(StoreContext);

  const [userId, setUserId] = useState(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const user = parseJwt(token);
      setUserId(user?.id);
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      console.log("User Id = ", userId);
    } else if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [userId, token, getTotalCartAmount]);

  const loadRazorpay = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (order_id, amount, currency, orderData) => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: razorpayKeyId,
      amount: amount,
      currency: currency,
      name: "Sky Hut Cafe",
      description: "Test Transaction",
      order_id: order_id,
      handler: async (response) => {
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderData: orderData,
        };

        const result = await axios.post(`${API_URL}/api/order/verify`, data, {
          headers: { token },
        });

        if (result.data.success) {
          navigate(`/myorders?success=true&order_id=${order_id}`);
        } else {
          navigate(`/myorders?success=false&order_id=${order_id}`);
        }
      },
      prefill: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        contact: data.phone,
      },
      notes: {
        address:
          data.street +
          ", " +
          data.city +
          ", " +
          data.state +
          ", " +
          data.zipCode +
          ", " +
          data.country,
      },
      theme: {
        color: "#e78610",
      },
    };

    const paymentObject = new Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    paymentObject.open();
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(),
      discount: discount,
      discount_amount: discountAmount,
      is_instagram_follower: isInstagramFollower,
      instagram_discount: instagramDiscount,
      instagram_discount_amount: instagramDiscountAmount,
    };

    let response = await axios.post(`${API_URL}/api/order/place`, orderData, {
      headers: { token },
    });

    if (response.data.success) {
      console.log("Actual data = ", response.data);
      const { order_id, amount, currency } = response.data;
      displayRazorpay(order_id, amount, currency, orderData);
      setCartItems({});
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <section className="container">
        <form className="place-order" onSubmit={placeOrder}>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>

            <div className="multi-fields">
              <input
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First Name"
                required
              />
              <input
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last Name"
                required
              />
            </div>

            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street"
              required
            />

            <div className="multi-fields">
              <input
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
                required
              />
              <input
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
                required
              />
            </div>

            <div className="multi-fields">
              <input
                name="zipCode"
                onChange={onChangeHandler}
                value={data.zipCode}
                type="text"
                placeholder="Zip Code"
                required
              />
              <input
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
                required
              />
            </div>

            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="tel"
              placeholder="Phone"
              required
            />
          </div>

          <div className="place-order-right">
            <div className="cart-total">
              <h2>Totals</h2>
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
              <button type="submit">Proceed to pay</button>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default PlaceOrder;
