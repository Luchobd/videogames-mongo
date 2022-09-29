const { videogameModel, genderModel } = require("../models");

// Videogames All and Query
const getVideogamesDb = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await videogameModel.find({}).populate("genders");

    if (name) {
      let videoGameName = result.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );

      videoGameName.length
        ? res.status(200).send(videoGameName)
        : res.status(200).send(["Game not found"]);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// Videogames ID
const getVideogameByID = async (req, res) => {
  const { id } = req.params;

  const result = await videogameModel.findById(id).populate("genders");

  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ msg: "Error not found" });
  }
};

// Videogames Create
const saveVideogamesDb = async (req, res) => {
  try {
    const apiVideogames = req.body;
    console.log(apiVideogames);
    // no hace falta recorrerlo... es decir no se usa el forEach
    const result = await videogameModel.create(apiVideogames);
    // console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

// Videogames Delete
const deleteVideogameDb = async (req, res) => {
  const { id } = req.params;
  // try {
  // await videogameModel.findById(id);

  await videogameModel.delete({ _id: id });

  return res.status(200).json({ msg: "Videogames deleted" });
  // } catch (error) {
  //   res.status(404).send("Not Found");
  // }
};

module.exports = {
  saveVideogamesDb,
  getVideogamesDb,
  getVideogameByID,
  deleteVideogameDb,
};
