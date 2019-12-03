export interface User {
    email : String,
    password : String,
	manager : Boolean,
	deactivated: Boolean,
	verified: Boolean,
	verificationCode: String
}

export interface Song {
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

	hidden: {type: Boolean, default: false},
	takeDownNotice: {type: Boolean, default: false}
}

export interface Review {
	songId: String,
	userId: String,
	userEmail: {type: String},
	review: { type: String },
	rating: { type: Number, min: 1, max: 5 },
	date: Date
}

export interface TakeDownNotice {
	songId: String,
	dateSent: Date,
	dateReceived: Date,
	dateHandled: Date,
}