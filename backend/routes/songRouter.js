const express = require('express');
const router = express.Router();
const controller = require("../controllers/songConroller");

//ROUTES
router.delete('/songs/', controller.deleteAllSongs);
router.post('/songs', controller.createSong);
router.get('/songs', controller.getSongs);
router.get('/songs/popular', controller.top10Songs);
router.get('/songs/search/:search', controller.searchSongs);

router.post('/songs/reviews/:songId', controller.createReview);
router.get('/songs/reviews/:songId', controller.getReviews);
router.put('/songs/reviews/edit/:reviewId', controller.editReview);
router.get('/songs/reviews/recent/:songId', controller.mostRecentReview);

module.exports = router;