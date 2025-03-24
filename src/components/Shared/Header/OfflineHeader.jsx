import { useState, useEffect, useContext } from "react";
import "../../../stylesheets/Shared/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Input,
  Form,
  message,
  Tooltip,
  Typography,
  Badge,
  Card,
} from "antd";
import axios from "axios";
import {
  OrderedListOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UnlockOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

import OfflineHeaderNav from "./OfflineHeaderNav";
import { StoreContext } from "../../../context/StoreContext";
import logo from "../../../assets/logo.webp";
import { API_URL } from "../../../store/apiUrl";
import Confetti from "react-confetti";

import greyCoin from "../../../assets/coins/grey.png";
import bronzeCoin from "../../../assets/coins/bronze.png";
import silverCoin from "../../../assets/coins/silver.png";
import goldCoin from "../../../assets/coins/gold.png";

const { Text } = Typography;

const OfflineHeader = () => {
  const navigate = useNavigate();
  const { setToken, token } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [points, setPoints] = useState(0);
  const [membershipStatus, setMembershipStatus] = useState("");
  const [hasOfflineOrders, setHasOfflineOrders] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [form] = Form.useForm();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("userRole");
    navigate("/offline-menu");
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const fetchOfflineOrders = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/offlineOrder/getByUserId/${userId}`,
        {
          headers: { token },
        }
      );
      if (response.data.success && response.data.orders.length > 0) {
        setHasOfflineOrders(true);
      }
    } catch (error) {
      console.error("Failed to fetch offline orders:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = parseJwt(token).id;
        const response = await axios.get(`${API_URL}/api/user/${userId}`, {
          headers: { token },
        });

        if (response.data.success) {
          setUserData(response.data.user);
          setPoints(response.data.user.points);
          setMembershipStatus(response.data.user.membershipStatus);
          console.log("My Data: ", response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (token) {
      const userId = parseJwt(token)?.id;
      if (userId) {
        fetchUserData();
        fetchOfflineOrders(userId);
      }
    }
  }, [token]);

  const showChangePasswordModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Password Form Data: ", values);
      const userId = parseJwt(token)?.id;
      if (userId) {
        const response = await axios.patch(
          `${API_URL}/api/user/${userId}`,
          { password: values.password },
          { headers: { token } }
        );
        if (response.data.success) {
          message.success("Password successfully changed");
          form.resetFields();
          setIsModalVisible(false);
        } else {
          message.error("Failed to change password");
        }
      }
    } catch (error) {
      console.error("Failed to submit password form data", error);
      message.error("Failed to change password");
    }
  };

  const showRedeemModal = () => {
    setIsRedeemModalVisible(true);
  };

  const handleRedeemCancel = () => {
    setIsRedeemModalVisible(false);
  };

  const handleRedeem = async () => {
    try {
      const userId = parseJwt(token)?.id;
      if (userId) {
        const response = await axios.post(
          `${API_URL}/api/points/redeem`,
          {
            userId,
            points: redeemPoints,
            description: "Redeemed for discount",
          },
          { headers: { token } }
        );
        if (response.data.message === "Points redeemed successfully") {
          const couponCode = response.data.couponCode;
          const discountAmount = response.data.discountAmount;

          const couponMessage = (
            <div style={{ textAlign: "center" }}>
              <Confetti
                width={windowWidth}
                height={windowHeight}
                numberOfPieces={600}
                recycle={false}
              />
              <Card
                title="🎉 Congratulations! 🎉"
                bordered={false}
                style={{
                  backgroundColor: "#e0ffe0",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <Text
                  strong
                  style={{
                    fontSize: "18px",
                    color: "#52c41a",
                    letterSpacing: "1px",
                  }}
                >
                  Use this coupon code for Rs. {discountAmount} off on your next
                  order!
                </Text>
                <br />
                <Text
                  strong
                  style={{
                    fontSize: "18px",
                    color: "#52c41a",
                    letterSpacing: "1px",
                  }}
                >
                  {couponCode}
                </Text>
                <Button
                  icon={<CopyOutlined />}
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(couponCode);
                    message.success("Coupon code copied to clipboard!");
                  }}
                >
                  Copy
                </Button>
              </Card>
            </div>
          );

          message.success({
            content: couponMessage,
            duration: 15,
          });
          setPoints(response.data.points);
          setRedeemPoints(0);
          setMembershipStatus(response.data.membershipStatus);
          setIsRedeemModalVisible(false);
        } else {
          message.error("Failed to redeem points");
        }
      }
    } catch (error) {
      console.error("Failed to redeem points", error);
      message.error("Failed to redeem points");
    }
  };

  const renderMembershipBadge = () => {
    let color, text;
    switch (membershipStatus) {
      case "Gold":
        color = "#cc9300";
        text = "Gold";
        break;
      case "Silver":
        color = "silver";
        text = "Silver";
        break;
      case "bronze":
        color = "brown";
        text = "Bronze";
        break;
      default:
        color = "gray";
        text = "Member";
    }
    return (
      <Badge
        count={points + " " + text}
        style={{
          backgroundColor: color,
          color: "white",
          fontSize: "14px",
          borderRadius: "10px",
        }}
      />
    );
  };

  // for points system info
  const pointsInfo = () => {
    Modal.info({
      title: "How Point System Works?",
      content: (
        <div>
          <p style={{ color: "var(--textLight)" }}>
            You will get points how much you will pay for online order and each
            point value is 10 paise (10 points = 1 INR).
          </p>
          <hr />
          <h3 style={{ color: "var(--primaryHoverColor)", fontSize: "1rem" }}>
            About Badge
          </h3>
          <ul>
            <li style={{ fontWeight: "500", color: "var(--textLight)" }}>
              <b style={{ color: "var(--textColor)" }}> Gold Badge:</b>{" "}
              {"Points >= 2500"}
            </li>
            <li style={{ fontWeight: "500", color: "var(--textLight)" }}>
              <b style={{ color: "var(--textColor)" }}> Silver:</b>{" "}
              {"Points >= 1000"}
            </li>
            <li style={{ fontWeight: "500", color: "var(--textLight)" }}>
              <b style={{ color: "var(--textColor)" }}> Bronze:</b>{" "}
              {"Points >= 200"}
            </li>
            <li style={{ fontWeight: "500", color: "var(--textLight)" }}>
              <b style={{ color: "var(--textColor)" }}> Brown:</b>{" "}
              {"Points < 200"}
            </li>
          </ul>
        </div>
      ),
      onOk() {},
    });
  };

  const content = (
    <div className="nav-popover">
      <div className="my-2">
        <h5 className="text-capitalize">{userData.name}</h5>
        <p className="my-0">{userData.email}</p>

        <hr />

        <div className="coin">
          <img
            src={
              membershipStatus.toLowerCase() === "gold"
                ? goldCoin
                : membershipStatus.toLowerCase() === "silver"
                ? silverCoin
                : membershipStatus.toLowerCase() === "bronze"
                ? bronzeCoin
                : greyCoin
            }
            alt="Coin for level"
          />
          <div className="about-level">
            <div className="level-info">
              <h2
                style={{
                  color: "var(--headingColor)",
                }}
              >
                {membershipStatus.toLowerCase() === "gold"
                  ? "Master"
                  : membershipStatus.toLowerCase() === "silver"
                  ? "Achiever"
                  : membershipStatus.toLowerCase() === "bronze"
                  ? "Explorer"
                  : "Newcomer"}
              </h2>
              <Tooltip title="How it work?">
                <Button
                  size="small"
                  shape="circle"
                  icon={<QuestionOutlined />}
                  onClick={pointsInfo}
                />
              </Tooltip>
            </div>

            {renderMembershipBadge()}
          </div>
        </div>

        <div>
          <Button
            type="primary"
            onClick={showRedeemModal}
            className="w-100"
            style={{ marginTop: "1rem" }}
            disabled={points < 50 ? true : false}
          >
            Redeem Now
          </Button>
        </div>

        <hr />

        <div className="menu">
          <NavLink to={"/offline/my-orders"}>
            <OrderedListOutlined /> Orders
          </NavLink>

          <NavLink to={"/offline/my-reservations"}>
            <ShopOutlined /> Reservations
          </NavLink>

          {hasOfflineOrders && (
            <NavLink to={"/offline/my-offline-orders"}>
              <ShoppingCartOutlined /> Your Offline Orders
            </NavLink>
          )}
        </div>

        <Button
          className="change-password-btn"
          type="link"
          onClick={showChangePasswordModal}
        >
          <UnlockOutlined /> Change Password
        </Button>
      </div>
      <Button
        variant="outline-danger"
        className="w-100 logout-btn"
        size="sm"
        onClick={logout}
      >
        Logged Out
      </Button>
    </div>
  );

  return (
    <>
      <header id="header" className="fixed-top stickyHeader">
        <div className="container d-flex align-items-center">
          <NavLink to={"/offline-menu"} className="logo me-auto">
            <img src={logo} alt="" className="img-fluid" />
          </NavLink>
          <OfflineHeaderNav content={content} open={open} setOpen={setOpen} />
        </div>
      </header>

      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Redeem Points"
        visible={isRedeemModalVisible}
        onOk={handleRedeem}
        onCancel={handleRedeemCancel}
        footer={[
          <Button key="back" onClick={handleRedeemCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleRedeem}>
            Redeem
          </Button>,
        ]}
      >
        <p>You have {points} points.</p>
        <p>
          Congratulations! You are at <b>{membershipStatus}</b> status.
        </p>
        <Form layout="vertical">
          <Form.Item
            name="redeemPoints"
            label="Points to Redeem"
            rules={[
              {
                required: true,
                message: "Please input the number of points to redeem!",
              },
            ]}
          >
            <Input
              type="number"
              value={redeemPoints}
              onChange={(e) => setRedeemPoints(e.target.value)}
              min={1}
              max={points}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OfflineHeader;
