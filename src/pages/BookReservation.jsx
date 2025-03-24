import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import img from "../assets/reservation/reserve.jpg";
import { Button, Form, Input, DatePicker, TimePicker, Select } from "antd";
import axios from "axios";
import "../stylesheets/BookReservation.css";
import { API_URL } from "../store/apiUrl";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const BookReservation = () => {
  const navigate = useNavigate();
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const { token } = useContext(StoreContext);

  const [form] = Form.useForm();
  const [reservationType, setReservationType] = useState("");
  const [reservationNames, setReservationNames] = useState([]);
  const [userId, setUserId] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const userId = parseJwt(token)?.id;
      setUserId(userId);
    }
  }, [token]);

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

  const displayRazorpay = async (
    razorpay_order_id,
    amount,
    currency,
    reservationData
  ) => {
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
      description: "Test Reservation Transaction",
      order_id: razorpay_order_id,
      handler: async (response) => {
        const data = {
          ...reservationData,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(
          `${API_URL}/api/reservation/verify`,
          data
        );

        if (result.data.success) {
          navigate(
            `/my-reservations?success=true&reservationId=${result.data.reservation._id}`
          );
          toast.success("Reservation booked successfully");
        } else {
          navigate(`/my-reservations?success=false`);
          toast.error("Something went wrong!");
        }
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

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const reservationData = {
          userId: userId,
          reservation_type: values.reservation_type,
          reservation_date: values.reservation_date.toISOString(),
          reservation_name: values.reservation_name,
          reservation_time: values.reservation_time.format("hh:mm A"),
          party_size: parseInt(values.party_size, 10),
          amount: 100,
        };

        try {
          let response = await axios.post(
            `${API_URL}/api/reservation/add`,
            {},
            {
              headers: { token },
            }
          );

          if (response.data.success) {
            const { reservation_id, amount, currency } = response.data;
            displayRazorpay(reservation_id, amount, currency, reservationData);
          } else {
            console.log("(RESERVATION BOOKING) - Something went wrong");
          }
        } catch (error) {
          console.log("Error adding reservation:", error);
        }
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleReservationTypeChange = async (value) => {
    setReservationType(value);
    form.setFieldsValue({ reservation_name: undefined });

    let url;
    if (value === "hut") {
      url = `${API_URL}/api/hut/allHuts`;
    } else if (value === "table") {
      url = `${API_URL}/api/table/allTables`;
    }

    try {
      const response = await axios.get(url, { headers: { token } });
      if (value === "hut") {
        const names = response.data
          .filter((item) => !item.is_booked)
          .map((item) => item.hut_name);
        setReservationNames(names);
      } else {
        const names = response.data
          .filter((item) => !item.is_booked)
          .map((item) => item.table_name);
        setReservationNames(names);
      }
    } catch (error) {
      console.error("Error fetching reservation names:", error);
    }
  };

  const disabledDate = (current) => {
    // User can not select past date
    return current && current < moment().startOf("day");
  };

  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>
          Reserve Your Spot at SkyHut Cafe - Book Tables or Huts Online in
          Bhopal
        </title>
        <meta
          name="title"
          content="Reserve Your Spot at SkyHut Cafe - Book Tables or Huts Online in Bhopal"
        />
        <meta
          name="description"
          content="Reserve your table or hut at SkyHut Cafe in Bhopal easily online. Enjoy our cozy huts and comfortable tables for a perfect dining experience. Book now for family gatherings, events, or casual dining."
        />
        <meta
          name="keywords"
          content="SkyHut Cafe reservation, book table online, hut reservation, hut booking Bhopal, online table booking Bhopal"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/reservation" />
      </Helmet>

      <Header />

      <section className="container reservation">
        <div className="row">
          <div className="col-12 col-lg-6 header-left-side order-lg-first order-last">
            {/* Reservation Form */}
            <h1>Reserve Your Table or Hut at only SkyHut</h1>
            <p>Fill the form to book reservation.</p>

            <Form form={form} layout="vertical">
              <Form.Item
                name="reservation_type"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation type!",
                  },
                ]}
              >
                <Select
                  onChange={handleReservationTypeChange}
                  placeholder="Select reservation type"
                >
                  <Option value="hut">Hut</Option>
                  <Option value="table">Table</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="reservation_date"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation date!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select date"
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                name="reservation_name"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation name!",
                  },
                ]}
              >
                <Select placeholder="Select reservation name">
                  {reservationNames.map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="reservation_time"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation time!",
                  },
                ]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  placeholder="Select time"
                  use12Hours
                  format="h:mm A"
                />
              </Form.Item>
              <Form.Item
                name="party_size"
                rules={[
                  {
                    required: true,
                    message: "Please enter total member for reservation!",
                  },
                  {
                    validator: (_, value) =>
                      value &&
                      Number.isInteger(Number(value)) &&
                      Number(value) > 0
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("It must be a positive integer!")
                          ),
                  },
                ]}
              >
                <Input type="number" placeholder="Total member" />
              </Form.Item>

              <Button
                type="primary"
                className="reservation-button"
                onClick={handleOk}
              >
                Pay & Confirm Reservation
              </Button>
            </Form>
          </div>

          {/* Main Header Right Side */}
          <div className="col-12 col-lg-6 header-right-side main-header-section-images order-md-first order-sm-first">
            <img src={img} alt="Reservation" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BookReservation;
