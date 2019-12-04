const Song = require("../models/song");
const Review = require("../models/review");

// Song.createIndex(  );

async function updateAverageReviews(songId) {
	let reviews = await Review.find({songId: songId, rating: { $ne: null }}, (err, reviews)=>{
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
	});

	let totalReviews = reviews.length;
	let sum = 0;
	for (var i = 0; i < totalReviews; i++) {
		sum += reviews[i].rating;
	}
	let rating = sum/totalReviews;
	if (isNaN(rating)) rating = 0;

	return await Song.findOneAndUpdate({_id: songId}, {reviewCount: totalReviews, averageRating: rating}, (err, song) => {});
}

function createSong(req, res) {
	let songInfo = req.body.song;
	let reviewInfo = req.body.review;
	console.log(req.body);

	Song.create(songInfo, (err, song) => {
		if(err) {
			// console.log(err);
			return res.status(400).send(err);
		}
		if (reviewInfo) {
		
			reviewInfo.songId = song._id;
			reviewInfo.userId = req.user._id;
			reviewInfo.userEmail = req.user.emal;
			Review.create(reviewInfo, async (err, review) => {
				if(err) {
					console.log(err);
					return res.status(400).send(err);
				}
				
				song = await updateAverageReviews(song._id);
				// song = await Song.findOneAndUpdate({_id: song._id}, {reviewCount: song.reviewCount + 1}, (err, song)=> {});
				return res.json({song: song, review: review});
			});

		} else {
			return res.json({song: song});
		}
	});
}

function getSongs(req, res) {
	Song.find({hidden: false}, (err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});
}

//todo use https://www.npmjs.com/package/datamuse to get suggestions
function searchSongs(req, res) {
	
	Song.find({ $text: { $search: req.params.search } }, { score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } ).exec((err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});
}

function top10Songs(req, res) {
	Song.find().sort({ reviewCount : -1 }).limit(10).exec((err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});	
}
function top10Rated(req, res) {
	Song.find().sort({ averageRating : -1 }).limit(10).exec((err, songs)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		return res.json({songs: songs});
	});	
}

async function deleteReview(req, res) {
	try {
		await Review.deleteOne({_id: req.params.reviewId});
		return res.send("deleted review");
	} catch (err) {
		return res.status(400).send(err);
	}
}

async function deleteSong(req, res) {
	try {
		await Song.deleteOne({_id: req.params.songId});
		await Review.deleteMany({songId: _id});
		return res.send("deleted songs, and reviews for that song");
	} catch (err) {
		return res.status(400).send(err);
	}

}

async function deleteAllSongs(req, res) {
	try {
		await Song.deleteMany();
		await Review.deleteMany();
		return res.send("deleted all songs and reviews");
	} catch (err) {
		return res.status(400).send(err);
	}
}

//todo dont lett users create reviews on songs that dont exist
async function createReview(req, res) {
	let reviewInfo = req.body;
	reviewInfo.songId = req.params.songId;
	reviewInfo.userId = req.user._id;
	reviewInfo.userEmail = req.user.email;
	let song = await Song.findById(reviewInfo.songId, (err, song)=>{
		if (err) {
			if (!song) return res.status(404).send(err);
		}
	});
	if (!song) return res.status(404).send("songId does not match any songs");

	Review.create(reviewInfo, async (err, review) => {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}
		console.log(review);

		await updateAverageReviews(review.songId);
		return res.json({review: review});
	});
}


function getReviews(req, res) {
	Review.find({songId: req.params.songId}, (err, reviews)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}		
		return res.json({reviews: reviews});
	});
}

function editReview(req, res) {
	Review.updateOne({_id: req.params.reviewId}, req.body, async (err, review)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}		
		await updateAverageReviews(review.songId);
		return res.json({review});
	});
}

function mostRecentReview(req, res) {
	Review.findOne({songId: req.params.songId}).sort({date: -1}).exec((err, review)=> {
		if(err) {
			console.log(err);
			return res.status(400).send(err);
		}		
		return res.json({review});
	});
}


exports.createSong = createSong;
exports.getSongs = getSongs;
exports.searchSongs = searchSongs;
exports.top10Songs = top10Songs;
exports.deleteSong = deleteSong;
exports.deleteAllSongs = deleteAllSongs;

exports.getReviews = getReviews;
exports.mostRecentReview = mostRecentReview;
exports.createReview = createReview;
exports.editReview = editReview;
exports.deleteReview = deleteReview;