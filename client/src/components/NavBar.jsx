import React from "react";
import { NavLink } from "react-router-dom";
import "../stylesheets/NavBar.css";
import MiniLogo from "../images/logo.png";

function NavBar() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="navUl">
          {/* <picture className="navbar__logo">
            <NavLink className={"navbar__link navbar__link_img"} exact to={"/"}>
              <img src={MiniLogo} alt="Logo" className="navbar__link_img" />
            </NavLink>
          </picture> */}

          <li>
            <NavLink className={"navbar__link"} to={"/home"}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink className={"navbar__link"} to={"/videogame"}>
              Creation Form
            </NavLink>
          </li>
          {/* <li>
            <NavLink className={"navbar__link"} to={"/thanks"}>
              Thanks
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
