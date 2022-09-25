const express = require("express");
const router = express.Router();

const { getGenders } = require("../utils/getGenders");
const { saveGenderDb, showGendersDb } = require("../controllers/genders");

router.get("/", showGendersDb);

router.post("/dbGenders", getGenders, saveGenderDb);

router.post("/", saveGenderDb);
module.exports = router;
