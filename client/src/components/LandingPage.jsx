import React from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/LandingPage.css";
import Logo from "../images/GAMEWORLD2.png";

function LandingPage() {
  return (
    <div className="landingPage">
      <picture className="landing__logo">
        <img src={Logo} alt="Logo" />
        <p className="landing__parragraf">THIS IS YOUR WORLD</p>
      </picture>

      <div className="landing__init">
        <NavLink to="/home">
          <button className="landing__init_btn">GAMEWORLD</button>
        </NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
