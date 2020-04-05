"use strict";
const express = require("express");
const router = express.Router();
const levelsController = require("../controllers/levelsController");


router.get("/", levelsController.levels_list_get);

router.get("/:id", levelsController.levels_get);

router.post("/", levelsController.levels_post);

router.put("/", levelsController.levels_list_get);

router.delete("/", levelsController.levels_list_get);

module.exports = router;
