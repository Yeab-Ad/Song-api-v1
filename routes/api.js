// routes/employee.routes.js
const express = require("express");
const router = express.Router();
const songController = require("./Controllers/song.controller");
const statisticsController = require("./Controllers/statistics.controller");

// CRUD routes for Songs
router.post("/songs", songController.createSong);
router.get("/songs", songController.listSongs);
router.put("/songs/:id", songController.updateSong);
router.delete("/songs/:id", songController.removeSong);

// get route for statistics
router.get("/statistics", statisticsController.generateStatistics);

module.exports = router;
