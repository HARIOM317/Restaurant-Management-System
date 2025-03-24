import React from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import PageNotFound from "../animations/page-not-found.json";
import "../stylesheets/Error404.css";
import Header from "../components/Shared/Header/Header";

const Error404 = () => {
  return (
    <>
      <Header />

      <section id="not-found">
        <div className="container">
          <div className="page-not-found">
            <Lottie
              loop={true}
              animationData={PageNotFound}
              className="lottie-animation"
            />
            <h2>We are sorry, page not found!</h2>
            <p>
              The page you visited might have been removed or does not exist
            </p>
            <NavLink to="/" className={"button"}>
              Back to Homepage
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
export default Error404;
