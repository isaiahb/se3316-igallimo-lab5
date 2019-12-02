const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Review = new Schema({
	songId: { type: mongoose.Schema.ObjectId, ref: ('Song') },
	userId: { type: mongoose.Schema.ObjectId, ref: ('User') },
	userEmail: {type: String},
	review: { type: String },
	rating: { type: Number, min: 1, max: 5 },
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', Review);