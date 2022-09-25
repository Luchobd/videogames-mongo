import React from "react";
import { NavLink } from "react-router-dom";
import Error404 from "../images/404.gif";
import "../stylesheets/NotFound.css";

function NotFound() {
  return (
    <div className="not__container">
      <div className="not__title">
        Game Over <br /> Not Found
      </div>

      <picture className="not__img">
        <img src={Error404} alt="404" />
      </picture>
      <div className="not__btn">
        <NavLink to="/home">
          <button>Home</button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
