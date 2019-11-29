//Modules
require('dotenv').config();

//Models
const User = require("../models/user");

//env variables
const testing = process.env.TESTING;
const testUrl = process.env.TEST_URL;
const url = process.env.URL;
const port = process.env.URL;
const managerEmail = process.env.MANAGER_EMAIL;

//Helper functions
const generateJWT = require("../helper/generateJWT");
const sendEmail = require("../helper/sendEmail");
const randomNumberGenerator = require("../helper/randomNumberGenerator");

function getVerificationLink(email, code) {
	var endpoint = "verify?email=" + email + "&code=" + code;
	if (testing) {
		return testUrl + ":" + port + "/api/" + endpoint;
	} 
	return url + "/api/" + endpoint;
}

//controller functions
async function deleteAllUsers(req, res) {
	try {
		await User.deleteMany();
		return res.send("deleted all users");

	} catch(err) {
		return res.status(400).send(err);
	}
}

async function signup(req, res) {

	let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	let email = req.body.email;
	let user;
	let verificationCode = randomNumberGenerator(25);

	try {
		user = await User.findOne({ email });
		if (user) return res.status(400).send("email already in use");
		
		User.create({email, password, verified: false, verificationCode, manager: email == managerEmail, deactivated: false}, function (err, user) {
			if (err) {
				console.log(err);
				return res.status(400).send(err);
			}
			let message = `visit link to verify ${getVerificationLink(email, verificationCode)}`;
			sendEmail()
			return res.json({message: "account created succesfully", user: user});
			
		});

	} catch (e) { }

};

async function verify(req, res) {
	let code = req.query.code;
	let email = req.query.email;
	console.log(`email is: ${email},  code is: ${code}`);

	try {
		user = await User.findOne({email, verificationCode: code });
		if (user) {
			//generate auth token and set auth cookie so client is authenticated and call other api endpoints
			var jwt = generateJWT(user);
			res.cookie('auth', jwt);
		} else {
			return res.status(404).send("in corect code");
		}

	} catch(e){
		
	}

}

