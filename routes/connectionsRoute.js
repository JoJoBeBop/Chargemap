"use strict";
const express = require("express");
const router = express.Router();
const connectionsController = require("../controllers/connectionsController");


router.get("/", connectionsController.connections_list_get);

router.get("/:id", connectionsController.connections_get);

router.post("/", connectionsController.connections_post);

router.put("/", connectionsController.connections_list_get);

router.delete("/", connectionsController.connections_list_get);

module.exports = router;
