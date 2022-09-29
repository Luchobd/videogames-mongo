import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, cleanFilter } from "../redux/actions/index";
import "../stylesheets/VideogameDetail.css";

function VideogameDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanFilter());
    };
  }, [dispatch, id]);

  const gameDetail = useSelector((state) => state.detail);

  console.log(gameDetail);
  const gendersMap =
    Object.keys(gameDetail).length &&
    gameDetail.genders.map((e) => e.name + " ");
  const platformsMap =
    Object.keys(gameDetail).length && gameDetail.platforms.map((e) => e + " ");

  return (
    <>
      <div className="detail__container">
        <div className="detail__content">
          <section className="detail__content_info">
            <picture className="detail__img">
              <img
                src={gameDetail.background_image}
                alt="image_detail"
                width="200px"
                weight="250px"
              />
            </picture>

            <article>
              <h2 className="detail__title">{gameDetail.name}</h2>
              <h3 className="detail__genders">{gameDetail && gendersMap}</h3>
              <h3 className="detail__date">{gameDetail.released}</h3>
              <h3 className="detail__rating">{`🌟 ${gameDetail.rating}`}</h3>
              <h3 className="detail__platforms">
                {gameDetail && platformsMap}
              </h3>
              <h5 className="detail__texto">{gameDetail.description}</h5>
            </article>
          </section>
        </div>
      </div>

      <div className="detail__btn">
        <NavLink to="/home">
          <button className="btn__back">Home</button>
        </NavLink>
      </div>
    </>
  );
}

export default VideogameDetail;
