// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import rootReducer from "./redux/reducer";
import {
  GET_VIDEOGAMES,
  GET_GENDERS,
  FILTER_BY_GENDER,
  FILTER_BY_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_NAME_VIDEOGAMES,
  POST_VIDEOGAME,
  GET_DETAILS,
} from "./redux/actions";
import * as data from "../../api/src/db.js";

describe("Reducer", () => {
  const state = {
    videogames: [],
    allVideogames: [],
    genders: [],
    detail: [],
  };
  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({
      videogames: [],
      allVideogames: [],
      genders: [],
      detail: [],
    });
  });
  it('Debería guardar en nuestro state los generos obtenidas de nuestro llamado al back cuando action type es "GET_GENDERS"', () => {
    const result = rootReducer(state, {
      type: GET_GENDERS,
      payload: data.genders,
    });

    expect(result).not.toEqual(state);
    expect(result).toEqual({
      genders: data.genders,
      detail: [],
      videogames: [],
      allVideogames: [],
    });
  });
  it('Debera guardar en nuestro state los detalles obtenidas de nuestro llamado al back cuando action type es "GET_DETAILS"', () => {
    const result = rootReducer(state, {
      type: GET_DETAILS,
      payload: data.detail,
    });

    expect(result).not.toEqual(state);
    expect(result).toEqual({
      detail: data.detail,
      genders: [],
      videogames: [],
      allVideogames: [],
    });
  });
});
