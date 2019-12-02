//Modules
require('dotenv').config();
const bcrypt = require('bcrypt');
const passport = require("passport");

//Models
const User = require("../models/user");

//env variables
const testing = process.env.TESTING;
const testUrl = process.env.TEST_URL;
const url = process.env.URL;
const port = process.env.PORT;
const managerEmail = process.env.MANAGER_EMAIL;

//Helper functions
const generateJWT = require("../helper/generateJWT");
const sendEmail = require("../helper/sendEmail");
const randomNumberGenerator = require("../helper/randomNumberGenerator");

function getVerificationLink(email, code) {
	var endpoint = "verify?email=" + email + "&code=" + code;
	var string = "";
	if (testing == "true") {
		string = testUrl + ":" + port + "/api/" + endpoint;
	} else {
		string = url + "/api/" + endpoint;
	}
	console.log(string);
	return string;
}

//controller functions
async function deleteAllUsers(req, res) {
	try {
		await User.deleteMany();
		return res.send("deleted all users");

	} catch (err) {
		return res.status(400).send(err);
	}
}


var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const callbackURL = process.env.callbackURL;

passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:9001/api/auth/google/callback"
},
	async function (accessToken, refreshToken, profile, cb) {

		// console.log(profile);
		console.log(profile);

		let user = await User.findOne({ email: profile._json.email });
		if (!user) {
			user = await User.create({ email: profile._json.email, verified: true, manager: email == managerEmail, deactivated: false });
		}
		console.log(`user = ${user}`);
		return cb(null, user);//null, user);
		// return cb(null, user);

		// User.findOrCreate({ googleId: profile.id }, function (err, user) {
		// 	console.log(profile);
		// 	return cb(err, user);
		// });
	}
));



async function signup(req, res) {
	let pass = req.body.password;
	if (!pass) return res.status(400).send("must send password");
	let password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
	let email = req.body.email;
	let user;
	let verificationCode = randomNumberGenerator(25);

	try {
		user = await User.findOne({ email });
		if (user) return res.status(400).send("email already in use");

		User.create({ email, password, verified: false, verificationCode, manager: email == managerEmail, deactivated: false }, function (err, user) {
			if (err) {
				console.log(err);
				return res.status(400).send(err);
			}
			let message = `visit link to verify ${getVerificationLink(email, verificationCode)}`;
			sendEmail(message, email, "lab5 email verification");
			return res.json({ message: "account created succesfully", user: user });

		});

	} catch (e) { }

};

async function verify(req, res) {
	let code = req.query.code;
	let email = req.query.email;
	//todo redirect user if i want

	try {
		user = await User.findOne({ email, verificationCode: code });
		if (user) {
			//generate auth token and set auth cookie so client is authenticated and call other api endpoints
			var jwt = generateJWT(user);
			res.cookie('auth', jwt);
			res.send("verified succesfully");
		} else {
			return res.status(404).send("in corect code");
		}

	} catch (e) {
		return res.status(404).send(e);
	}

}

function login(req, res) {

	//Checks if a user exists with this username
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return res.status(400).send(err);
		}
		if (!user) {
			//no user found with that email address
			return res.status(404).send("No User Found")
		} else {
			//user found, check if password matches
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(401).send("Invalid Password");
			}
			else {
				//password matches so set jwt auth cookie and return user object
				//get jwt and set cookie
				res.cookie('auth', generateJWT(user));
				return res.json({ user: user });
			}
		}
	});
};

// function forgotPassword(req, res) {
// 		//Checks if a user exists with this username
// 		User.findOne({ email: req.params.email }, function (err, user) {
// 			if (err) {
// 				return res.status(400).send(err);
// 			}
// 			if (!user) {
// 				//no user found with that email address
// 				return res.status(404).send("No User Found")
// 			} else {
// 				//user found, check if password matches
				
// 				//restore password
// 			}
// 		});
// }


exports.login = login;
exports.deleteAllUsers = deleteAllUsers;
exports.verify = verify;
exports.signup = signup;
exports.passport = passport;