import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../redux/actions";
import "../stylesheets/SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handeleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameVideogames(name));
    setName("");
  };

  return (
    <>
      {/* Input de búsqueda para encontrar videojuegos por nombre */}
      <form className="search__form" onSubmit={(e) => handeleSubmit(e)}>
        <input
          type="text"
          placeholder="Search..."
          value={name}
          className="search__form_input"
          onChange={(e) => handeleInputChange(e)}
        />
        <button type="submit" className="search__form_btn">
          GO
        </button>
      </form>
    </>
  );
}

export default SearchBar;
