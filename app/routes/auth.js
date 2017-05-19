
var express = require('express');
var jwt = require("jsonwebtoken");

var token;
var secret = "1234";

var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport){

	app.get('/signup', authController.signup);


	app.get('/signin', authController.signin);


	app.post('/signin', passport.authenticate('local-signin'), function(req, res) {
			// if we are in this function, that means that passpport auth'd the email/password combo

			// first thing we do, is we get the user info
			// we couldnt figure this out on Friday... fucking so easy
	    	var user = req.user;

	    	// Next we create a JSON Web Token with all the information we need inside.
	    	// For now, lets just put the id. We might want to add admin priviledges later
			token = jwt.sign({
				id: user.id,
			}, secret)

			// Before we were redirecting to dahsboard/:id.
			// Why would we do this. I would just render the dashboard handlebar page right away.
			// We already know the user is valid. He/she just logged in.
			// Lets just send them to their page directly
			res.redirect(`/dashboard/${user.id}`);
		}
	);



	app.get('/dashboard/:id', function(req, res) {
		// In here, I stripped out the passport stuff.
		// You can choose to add it in later if you see the need for it.
		// But for now we don't quite need it.

		// Ok what do we want to do here?
		// The end goal is to deliver the handlebar dashboard page like we do in the POST /signin route
		// But here, we need to authorize.
		var decoded = jwt.verify(token, secret);
		console.log('bruh', decoded)

	});
}







