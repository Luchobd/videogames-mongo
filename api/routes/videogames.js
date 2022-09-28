const express = require("express");
const router = express.Router();
const { getApiInfo } = require("../utils/getVideogames");
const {
  saveVideogamesDb,
  getVideogamesDb,
  getVideogameByID,
  deleteVideogameDb,
} = require("../controllers/videogames");

router.get("/", getVideogamesDb);
router.get("/:id", getVideogameByID);
router.post("/", saveVideogamesDb);
router.delete("/:id", deleteVideogameDb);

router.post("/apiVideogames", getApiInfo, saveVideogamesDb);
module.exports = router;
