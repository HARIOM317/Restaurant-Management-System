import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, DatePicker, TimePicker, Form, Row, Col } from "antd";
import axios from "axios";
import { API_URL } from "../store/apiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { StoreContext } from "../context/StoreContext";

const EventModal = ({ isModalVisible, handleCancel, handleOk }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [form] = Form.useForm();

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

  useEffect(() => {
    if (userId) {
      console.log("User found!");
    } else {
      const user = parseJwt(token);
      setUserId(user?.id);
    }
  }, [userId, token]);

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
    eventData
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
      description: "Test Event Transaction",
      order_id: razorpay_order_id,
      handler: async (response) => {
        const data = {
          ...eventData,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(`${API_URL}/api/event/verify`, data);

        if (result.data.success) {
          navigate(`/verify?success=true&eventId=${result.data.event._id}`);
          toast.success("Event request sent successfully");
        } else {
          navigate(`/verify?success=false`);
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

  const submitForm = async () => {
    try {
      const values = await form.validateFields();

      if (userId) {
        const eventData = {
          userId: userId,
          event_name: values.event_name,
          description: values.description,
          mobile: values.mobile,
          event_date: values.event_date.format("YYYY-MM-DD"),
          event_time: values.event_time.format("hh:mm A"),
          party_size: parseInt(values.party_size, 10),
          amount: 100,
        };

        let response = await axios.post(
          `${API_URL}/api/event/add`,
          {
            user_id: userId,
            event_name: values.event_name,
            description: values.description,
            mobile: values.mobile,
            event_date: values.event_date.format("YYYY-MM-DD"),
            event_time: values.event_time.format("hh:mm A"),
            party_size: values.party_size,
          },
          {
            headers: {
              token,
            },
          }
        );

        if (response.data.success) {
          const { event_id, amount, currency } = response.data;
          displayRazorpay(event_id, amount, currency, eventData);

          form.resetFields();
          handleOk();
        } else {
          console.log("(EVENT BOOKING) - Something went wrong");
          toast.error("Something went wrong");
        }
      } else {
        console.log("Failed to extract user id from token!");
      }
    } catch (error) {
      console.error("Failed to submit form data", error);
      toast.error("Failed to create event");
    }
  };

  const disabledDate = (current) => {
    // User can not select past date
    return current && current < moment().startOf("day");
  };

  return (
    <Modal
      title="Book Event"
      visible={isModalVisible}
      onOk={submitForm}
      onCancel={handleCancel}
      okText="Pay and Book"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="event_name"
          label="Event Title"
          rules={[{ required: true, message: "Please input the event title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description for event"
          rules={[
            {
              required: true,
              message: "Please write a short description about the event!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[
            { required: true, message: "Please input your mobile number!" },
            {
              pattern: /^\d{10}$/,
              message: "Mobile number must be 10 digits!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row
          gutter={[16, 0]}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Col>
            <Form.Item
              name="event_date"
              label="Event Date"
              rules={[
                { required: true, message: "Please select the event date!" },
              ]}
            >
              <DatePicker disabledDate={disabledDate} />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="event_time"
              label="Event Time"
              rules={[
                { required: true, message: "Please select the event time!" },
              ]}
            >
              <TimePicker use12Hours format="h:mm A" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="party_size"
          label="Total members in event"
          rules={[
            {
              required: true,
              message: "Please input the total members come into the event!",
            },
            {
              validator: (_, value) =>
                value && Number.isInteger(Number(value)) && Number(value) > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("It must be a positive integer!")),
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventModal;
