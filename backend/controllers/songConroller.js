const Song = require("../models/song");
const Review = require("../models/review");

Song.createIndex( { title: "text", artist: "text", album: "text", year:"text", genre: "text" } );

function createSong(req, res) {
	let songInfo = req.body.song;
	let reviewInfo = req.body.review;

	Song.create(songInfo, (err, song) => {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		if (reviewInfo) {
			reviewInfo.songId = song;
			reviewInfo.userId = req.user._id;
			reviewInfo.userEmail = req.user.emal;
			Review.create(reviewInfo, (err, review) => {
				if(err) {
					console.log(err);
					return res.status(400).send(err);
				}
				return res.json({song: song, review: review});
			});

		} else {
			return res.json({song: song});
		}
	});
}

function getSongs(req, res) {
	Song.find(req.query, (err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});
}

function searchSongs(req, res) {
	Song.find({ $text: { $search: req.query.search }}, (err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});
}

function top10Songs(req, res) {
	Song.find({$orderby: { reviewCount : -1 } }, (err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	}).limit(10);	
}

function deleteSong(req, res) {

}




exports.createSong = createSong;
exports.getSongs = getSongs;
exports.searchSongs = searchSongs;
exports.top10Songs = top10Songs;
exports.deleteSong = deleteSong;