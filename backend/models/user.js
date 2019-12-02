const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//todo define default values
let User = new Schema({
    email : String,
    password : String,
	manager : Boolean,
	deactivated: Boolean,
	verified: Boolean,
	verificationCode: String
});

module.exports = mongoose.model('User', User);