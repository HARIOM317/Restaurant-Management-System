import React, { useContext, useState, useEffect } from "react";
import "../stylesheets/Cart/Cart.css";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../store/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import OfflineHeader from "../components/Shared/Header/OfflineHeader";
import Footer from "../components/Shared/Footer/Footer";
import { Image, Table } from "antd";

const OfflineCartPage = () => {
  const foodImageUrl = `${API_URL}/images/`;

  const [userId, setUserId] = useState(null);

  const {
    cartItems,
    setCartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    token,
    offlineTableId,
    orderMode,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  console.log("The Table ID = ", offlineTableId);
  console.log("The Order Mode = ", orderMode);

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      table_id: offlineTableId,
      user_id: userId,
      items: orderItems,
      status: "Food Processing",
      amount: getTotalCartAmount(),
      payment: false,
    };

    console.log("Offline Order Data = ", orderData);

    try {
      let response = await axios.post(
        `${API_URL}/api/offlineOrder/create`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Order booked successfully");
        setTimeout(() => {
          navigate("/offline/my-offline-orders");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error placing order: ", error.response || error.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      const user = parseJwt(token);
      setUserId(user?.id);
    }
  }, [token]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

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
      <OfflineHeader />

      <div className="cart container">
        <div className="cart-items-wrapper">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName="cart-table-row"
            scroll={{
              x: 600,
            }}
          />
        </div>

        <hr />

        <div className="cart-total">
          <div className="offline-cart-total-details">
            <p>Total</p>
            <p>Rs. {getTotalCartAmount().toFixed(2)}</p>
          </div>

          <button onClick={placeOrder}>Confirm Order</button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OfflineCartPage;
