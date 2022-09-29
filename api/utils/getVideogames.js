const axios = require("axios");
const { model } = require("mongoose");
const { videogameModel, genderModel } = require("../models/index");
const { API_KEY } = process.env;

const getApiInfo = async (req, res, next) => {
  const genres = await genderModel.find({});

  const getGames = [];
  let numeroPagina = 1;
  while (numeroPagina <= 6) {
    let api = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${numeroPagina}`
    );
    api.data.results.map(async (e) => {
      let buscarId = await axios.get(
        `https://api.rawg.io/api/games/${e.id}?key=${API_KEY}`
      );
      let descriptionGame = buscarId.data.description_raw;
      const genresEach = e.genres.map((e) => e.name);
      let arrayGenres = [];
      for (let i = 0; i < genresEach.length; i++) {
        const genresFilter = genres.filter((e) => e.name === genresEach[i]);
        arrayGenres.push(genresFilter);
      }
      const genresFlat = arrayGenres.flat();
      const genresMap = genresFlat.map((e) => e._id);

      getGames.push({
        idVideogame: e.id,
        name: e.name,
        background_image: e.background_image,
        genders: genresMap,
        description: descriptionGame,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
      });
    });
    numeroPagina++;
  }
  req.body = getGames;
  next();
};

module.exports = { getApiInfo };
