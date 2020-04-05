"use strict";
const express = require("express");
const router = express.Router();
const currenttypeController = require("../controllers/currenttypesController");


router.get("/", currenttypeController.currentType_list_get);

router.get("/:id", currenttypeController.currentType_get);

router.post("/", currenttypeController.currentType_post);

router.put("/", currenttypeController.currentType_list_get);

router.delete("/", currenttypeController.currentType_list_get);

module.exports = router;
