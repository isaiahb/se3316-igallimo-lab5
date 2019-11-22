const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    username : String,
    email : String,
    password : String,
	manager : Boolean,
	deactivated: Boolean,
});

module.exports = mongoose.model('User', User);