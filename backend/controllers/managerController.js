const Song = require("../models/song");
const User = require("../models/user");

function hideSong(req, res) {
	Song.findOneAndUpdate({_id: req.params.songId}, {hidden: true}, (err, song)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(song) {
			return res.json({song});
		} else {
			return res.status(404).send("song with song id not found");
		}
	});
}

function showSong(req, res){
	Song.findOneAndUpdate({_id: req.params.songId}, {hidden: false}, (err, song)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(song) {
			return res.json({song});
		} else {
			return res.status(404).send("song with song id not found");
		}
	});
}


function activateUser(req, res) {
	User.findOneAndUpdate({_id: req.params.userId}, {deactivated: false}, (err, user)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(user) {
			return res.send(`user ${user.email} has been activated`);
		} else {
			return res.status(404).send("user with that id was not found");
		}
	});
}


function deactivateUser(req, res){
	if(req.params.userId == req.user._id) return  res.status(400).send("cannot deactivate yourself");

	User.findOneAndUpdate({_id: req.params.userId}, {deactivated: true}, (err, user)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(user) {
			return res.send(`user ${user.email} has been deactivated`);
		} else {
			return res.status(404).send("user with that id was not found");
		}
	});
}
function grantManager(req, res){
	User.findOneAndUpdate({_id: req.params.userId}, {manager: true}, (err, user)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(user) {
			return res.send(`user ${user.email} has been granted manager access`);
		} else {
			return res.status(404).send("user with that id was not found");
		}
	});
}
function removeManager(req, res){
	if(req.params.userId == req.user._id) return  res.status(400).send("cannot remove manager privalege from yourself");

	User.findOneAndUpdate({_id: req.params.userId}, {manager: false}, (err, user)=>{
		if(err) {
			return res.status(400).send(err);
		}
		if(user) {
			return res.send(`user ${user.email} has been stripped of manager access`);
		} else {
			return res.status(404).send("user with that id was not found");
		}
	});
}
function getManagers(req, res){
	User.find({manager: true}, (err, users)=>{
		if(err) {
			return res.status(400).send(err);
		}
		return res.json({users});
	});
}

function getUsers(req, res){
	User.find((err, users)=>{
		if(err) {
			return res.status(400).send(err);
		}
		return res.json({users});
	});
}


function getSongsWithNotice(req, res) {
	Song.find({takeDownNotice: true}, (err, songs)=>{
		if(err) {
			return res.status(400).send(err);
		}
		return res.json({songs});
	});
}

function getAllSongs(req, res) {
	Song.find((err, songs)=>{
		if(err) {
			return res.status(400).send(err);
		}
		return res.json({songs});
	});
}


module.exports.hideSong = hideSong;
module.exports.showSong = showSong;
module.exports.activateUser = activateUser;
module.exports.deactivateUser = deactivateUser;
module.exports.grantManager = grantManager;
module.exports.removeManager = removeManager;
module.exports.getManagers = getManagers;
module.exports.getUsers = getUsers;

module.exports.getSongsWithNotice = getSongsWithNotice;
module.exports.getAllSongs = getAllSongs;