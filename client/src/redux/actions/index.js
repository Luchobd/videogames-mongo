import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENDERS = "GET_GENDERS";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_NAME_VIDEOGAMES = "GET_NAME_VIDEOGAMES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_FILTER = "CLEAN_FILTER";

// All Videogames
export const getVideogames = () => async (dispatch) => {
  const resp = await axios.get(
    "https://videogames-mongo.up.railway.app/videogames"
  );
  dispatch({
    type: "GET_VIDEOGAMES",
    payload: resp.data,
  });
};

// All Genders
export function getGenders() {
  return async function (dispatch) {
    const resp = await axios.get(
      "https://videogames-mongo.up.railway.app/genders"
    );
    dispatch({
      type: "GET_GENDERS",
      payload: resp.data,
    });
  };
}

// Create Rute
export function postVideogames(payload) {
  return async function (dispatch) {
    console.log(payload);
    const rutaPost = "https://videogames-mongo.up.railway.app/videogames";
    const post = await axios.post(rutaPost, payload);
    return post;
  };
}

// Rute Query but name
export function getNameVideogames(name) {
  return async function (dispatch) {
    const rutaQueryVideogames = `https://videogames-mongo.up.railway.app/videogames?name=${name}`;
    const queryVideogames = await axios.get(rutaQueryVideogames);
    return dispatch({
      type: "GET_NAME_VIDEOGAMES",
      payload: queryVideogames.data,
    });
  };
}

// Detail Rute
export function getDetail(id) {
  return async function (dispatch) {
    const rutaParams = `https://videogames-mongo.up.railway.app/videogames/${id}`;
    const detail = await axios.get(rutaParams);
    return dispatch({
      type: "GET_DETAILS",
      payload: detail.data,
    });
  };
}

// =========== Filters and Orders ===========================

export function filterVideogamesByGender(payload) {
  return {
    type: "FILTER_BY_GENDER",
    payload,
  };
}

export function filterVideogamesByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

// ===========================================================

// Clear Route
export function cleanFilter() {
  return {
    type: "CLEAN_FILTER",
    payload: [],
  };
}
