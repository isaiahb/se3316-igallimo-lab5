const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Song = new Schema({
	//ID3V1 properties
	header: String,
	title: {type: String, required: true},
	artist: {type: String, required: true},
	album: String,
	year: String,
	comment: String,
	"zero-byte": Boolean,
	track: Number,
	genre: "String",

	//reviewe info
	reviewCount: {type: Number, default: 0},
	averageRating: {type: Number},

	hidden: {type: Boolean, default: false}
	
});//, { autoIndex: false });
Song.index({'$**': 'text'});
module.exports = mongoose.model('Song', Song);