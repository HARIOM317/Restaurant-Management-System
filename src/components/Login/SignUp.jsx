import React, { useContext, useEffect, useState } from "react";
import "../../stylesheets/Login.css";
import { API_URL } from "../../store/apiUrl";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header/Header";
import OfflineHeader from "../Shared/Header/OfflineHeader";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const navigate = useNavigate();

  const url = `${API_URL}/api/user/register`;
  const { token, setToken, setRole, isOfflineOrder } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post(url, data);

    if (response.data.success) {
      setToken(response.data.token);
      setRole(response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.role === "staff") {
        navigate("/");
      } else if (isOfflineOrder === true) {
        navigate("/offline-menu");
      } else {
        navigate("/");
      }

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      {/* For SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/icon.webp" />
        <title>Sign Up for SkyHut Cafe - Join Us Now</title>
        <meta
          name="title"
          content="Sign Up for SkyHut Cafe - Join Our Community"
        />
        <meta
          name="description"
          content="Create an account with SkyHut Cafe to enjoy easy reservations, special offers, and more. Join our community and make your dining experience in Bhopal even better."
        />
        <meta
          name="keywords"
          content="SkyHut Cafe sign up, SkyHut Cafe registration, create SkyHut Cafe account, join SkyHut Cafe, SkyHut Cafe community"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/register" />
      </Helmet>

      {isOfflineOrder ? <OfflineHeader /> : <Header />}

      <div className="login">
        <form className="login-container" onSubmit={onLogin}>
          <div className="login-title">
            <h1>Sign Up</h1>
          </div>

          <div className="login-inputs">
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Name"
              required
            />
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">Register</button>

          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>

          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>login</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
