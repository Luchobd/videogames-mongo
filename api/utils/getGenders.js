require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const getGenders = async (req, res, next) => {
  try {
    const genders = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genderInfo = await genders.data.results.map((item) => ({
      name: item.name,
    }));

    req.body = genderInfo;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getGenders };
