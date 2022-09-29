import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenders,
  filterVideogamesByGender,
  filterVideogamesByCreated,
  orderByName,
  orderByRating,
} from "../redux/actions";
import { NavLink } from "react-router-dom";
import CardVideogames from "./CardVideogames";
import Paginated from "./Paginated";
import NavBar from "./NavBar";
import "../stylesheets/Home.css";
import GifLoading from "../images/render.gif";

function Home() {
  // usar hooks
  const dispatch = useDispatch();
  // trae todos los personajes del reducer
  const allVideogames = useSelector((state) => state.videogames);
  const allGenders = useSelector((state) => state.genders);

  const [order, setOrder] = useState("");
  // PAGINADO
  const [currentPage, setCurrentPege] = useState(1);
  const [videogamesPerPage] = useState(15);

  const indexOfLastVideogames = currentPage * videogamesPerPage; // 15 - Indice final de video juegos
  const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage; // 0 - Indice incial de video juegos
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogames,
    indexOfLastVideogames
  ); // video juegos actuales, es decir todos los video juegos

  const paginated = (pageNumber) => {
    setCurrentPege(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenders());
  }, [dispatch]);

  //handles
  // const handleClickReset = (e) => {
  //   e.preventDefault();
  //   dispatch(getVideogames());
  //   setCurrentPege(1);
  // };

  const handleFilterSelectGenders = (e) => {
    e.preventDefault();
    dispatch(filterVideogamesByGender(e.target.value));
  };

  const handleFilterSelectCreated = (e) => {
    e.preventDefault();
    dispatch(filterVideogamesByCreated(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPege(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  const handleOrderByRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPege(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <div>
      <NavBar />
      {allVideogames[0] === "Game not found" ? (
        <div className="home__not_exist">
          <h2>Videogame Not Exist!!</h2>
        </div>
      ) : (
        <div>
          <Paginated
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginated={paginated}
          />

          <div className="home__container_select">
            {/* Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y rating  */}
            <section className="home__selection_select">
              <h3 className="home__title_select">Rating</h3>
              <select
                className="home__option_select"
                onChange={(e) => handleOrderByRating(e)}
              >
                <optgroup label="Rating">
                  <option value="ascRtg">1 - 5</option>
                  <option value="descRtg">5 - 1</option>
                </optgroup>
              </select>
            </section>
            <section className="home__selection_select">
              <h3 className="home__title_select">Alphabetic</h3>
              <select
                className="home__option_select"
                onChange={(e) => handleOrderByName(e)}
              >
                <optgroup label="Alphabetic">
                  <option value="ascAlf">A - Z</option>
                  <option value="descAlf">Z - A</option>
                </optgroup>
              </select>
            </section>

            {/* reset all */}
            {/* <button
              className="home__btn_reset"
              onClick={(e) => handleClickReset(e)}
            >
              Reset
            </button> */}

            {/* Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros */}
            <section className="home__selection_select">
              <h3 className="home__title_select">Videogames</h3>
              <select
                className="home__option_select"
                onChange={(e) => handleFilterSelectCreated(e)}
              >
                <option value="All">All...</option>
                <optgroup label="API">
                  <option value="VideoGame">Videogames</option>
                </optgroup>
                <optgroup label="Created">
                  <option value="VideoGameCreated">Videogames Created</option>
                </optgroup>
              </select>
            </section>
            <section className="home__selection_select">
              <h3 className="home__title_select">Genders</h3>
              <select
                className="home__option_select"
                onChange={(e) => handleFilterSelectGenders(e)}
              >
                <option value="All">All...</option>
                <optgroup label="Genders">
                  {allGenders?.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </section>
          </div>
          {/* Área donde se verá el listado de videojuegos. Deberá mostrar su: */}
          {allVideogames.length ? (
            <div className="home__render_cards">
              {currentVideogames?.map((game, index) => {
                return (
                  <div key={index}>
                    <NavLink
                      to={`/videogames/${game._id}`}
                      className="home__link_cards"
                    >
                      <CardVideogames
                        name={game.name}
                        genders={game.genders.map((e) => e)}
                        rating={"Rating: " + game.rating}
                        background_image={
                          game.background_image ? (
                            game.background_image
                          ) : (
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjBJWlHCDYQu_KapwEg1c3SFFxYoW3bpvmQ&usqp=CAU"
                              alt="Default_Image"
                            />
                          )
                        }
                      />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <picture className="home__loading">
              <img src={GifLoading} alt="Loading" />
            </picture>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
