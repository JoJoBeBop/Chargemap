'use strict';
const express = require('express');
const router = express.Router();
const connectiontypesController = require('../controllers/connectiontypesController');

router.get("/", connectiontypesController.connectionTypes_list_get);

router.get("/:id", connectiontypesController.connectionTypes_get);

router.post("/", connectiontypesController.connectionTypes_post);

module.exports = router;
