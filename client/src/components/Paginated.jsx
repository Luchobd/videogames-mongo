import React from "react";
import SearchBar from "./SearchBar";

import "../stylesheets/Paginated.css";
import Logo from "../images/GAMEWORLD3.png";

function Paginated({
  videogamesPerPage,
  allVideogames,
  paginated,
  setCurrentPege,
}) {
  const pageNumbers = [];
  let page = 1;
  while (page <= Math.ceil(allVideogames / videogamesPerPage)) {
    pageNumbers.push(page);
    page++;
  }

  return (
    <div className="paginated__principal_container">
      <picture className="paginated__logo">
        <img src={Logo} alt="Logo" onClick={() => window.location.reload()} />
      </picture>
      <nav className="paginated__container">
        <ul className="paginated">
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <button onClick={() => paginated(number)}>{`${number}`}</button>
              </li>
            ))}
        </ul>
      </nav>

      <div>
        <SearchBar setCurrentPege={setCurrentPege} />
      </div>
    </div>
  );
}

export default Paginated;

<button className="home__btn_reset">Reset</button>;
