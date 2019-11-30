const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

//ROUTES
router.post('/signup', controller.signup);
router.get('/verify', controller.verify);
router.delete('/users', controller.deleteAllUsers);


// router.get('/auth/google', controller.passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));
router.get('/auth/google', controller.passport.authenticate('google', { scope: [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/userinfo.email'
]},
	//login callback
	(err, user) => {
		console.log(user);
	}
));


//todo change redirects

router.get('/auth/google/callback', controller.passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
	// Successful authentication, redirect home.
	console.log("success");
	console.log(req.user);
	//todo sucessfully logged in so set cookies or w/e
	res.redirect('/');
});

//allow verification functions before injecting middleware
module.exports = router;