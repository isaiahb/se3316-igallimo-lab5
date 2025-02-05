const express = require('express');
const router = express.Router();
const controller = require("../controllers/managerController");

//ROUTES
router.put('/activateUser/:userId', controller.activateUser);
router.put('/deactivateUser/:userId', controller.deactivateUser);

router.put('/grantManager/:userId', controller.grantManager);
router.put('/removeManager/:userId', controller.removeManager);

router.get('/managers/', controller.getManagers);
router.get('/users/', controller.getUsers);

router.put('/hideSong/:songId', controller.hideSong)
router.put('/showSong/:songId', controller.showSong)

router.get('/songsWithNotice/', controller.getSongsWithNotice);
router.get('/allSongs/', controller.getAllSongs);


//todo dcma takedown stuff


module.exports = router;