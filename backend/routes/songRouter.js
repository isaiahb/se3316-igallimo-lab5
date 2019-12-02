const express = require('express');
const router = express.Router();
const controller = require("../controllers/songConroller");

//ROUTES
router.post('/songs', controller.createSong);
router.get('/songs', controller.getSongs);
router.get('/songs/popular', controller.top10Songs);

module.exports = router;