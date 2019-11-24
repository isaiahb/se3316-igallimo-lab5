const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TakeDownNotice = new Schema({
	songId: { type: mongoose.Schema.ObjectId, ref: ('Song') },
	dateSent: Date,
	dateReceived: Date,
	dateHandled: Date,
});

module.exports = mongoose.model('TakeDownNotice', TakeDownNotice);