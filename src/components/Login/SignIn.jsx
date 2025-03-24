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

const SignIn = () => {
  const navigate = useNavigate();

  const url = `${API_URL}/api/user/login`;
  const { token, setToken, setRole, isOfflineOrder } = useContext(StoreContext);
  const [data, setData] = useState({
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
        <title>Login to SkyHut Cafe - Access Your Account</title>
        <meta
          name="title"
          content="Login to SkyHut Cafe - Access Your Account"
        />
        <meta
          name="description"
          content="Sign in to your SkyHut Cafe account to manage your reservations, orders, events and more. Enjoy a seamless dining experience with easy access to all our services"
        />
        <meta
          name="keywords"
          content="SkyHut Cafe login, Sign In SkyHut Cafe, Sky Hut Cafe Account, Access SkyHut Cafe account"
        />
        <link rel="canonical" href="https://www.skyhutcafe.com/login" />
      </Helmet>

      {isOfflineOrder ? <OfflineHeader /> : <Header />}

      <div className="login">
        <form className="login-container" onSubmit={onLogin}>
          <div className="login-title">
            <h1>Sign In</h1>
          </div>

          <div className="login-inputs">
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

          <button type="submit">Login</button>

          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>

          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Create account</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
