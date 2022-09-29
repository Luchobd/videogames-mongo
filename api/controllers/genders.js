require("dotenv").config();
const { genderModel } = require("../models/index");

const showGendersDb = async (req, res) => {
  const result = await genderModel.find({});
  res.send(result);
};

const saveGenderDb = async (req, res) => {
  try {
    const apiGenders = req.body;

    // no hace falta recorrerlo... es decir no se usa el forEach
    const result = await genderModel.create(apiGenders);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { saveGenderDb, showGendersDb };
