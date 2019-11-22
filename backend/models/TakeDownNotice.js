const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Review = new Schema({
	songId: { type: mongoose.Schema.ObjectId, ref: ('Song') },
	userId: { type: mongoose.Schema.ObjectId, ref: ('User') },
	review: { type: String },
	rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model('Review', Review);