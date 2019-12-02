const Song = require("../models/song");
const User = require("../models/user");

function hideSong(req, res){}
function showSong(req, res){}
function activateUser(req, res){}
function deactivateUser(req, res){}
function grantManager(req, res){}
function removeManager(req, res){}
function getManagers(req, res){}
function getUsers(req, res){}

module.exports.hideSong = hideSong;
module.exports.showSong = showSong;
module.exports.activateUser = activateUser;
module.exports.deactivateUser = deactivateUser;
module.exports.grantManager = grantManager;
module.exports.removeManager = removeManager;
module.exports.getManagers = getManagers;
module.exports.getUsers = getUsers;