
var express = require('express');
var jwt = require("jsonwebtoken");


var token;
var secret = "1234";

var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport){

	app.get('/signup', authController.signup);


	app.get('/signin', authController.signin);


	app.post('/signin', passport.authenticate('local-signin'), function(req, res, next) {

		console.log()

			// if we are in this function, that means that passpport auth'd the email/password combo

			// first thing we do, is we get the user info
			// we couldnt figure this out on Friday... fucking so easy
	    	var user = req.user;

	    	// Next we create a JSON Web Token with all the information we need inside.
	    	// For now, lets just put the id. We might want to add admin priviledges later
			token = jwt.sign({
				id: user.id,
			}, secret)

			console.log('token', token)
			// we respond with a json with the token in it.
			// now the client (browser) will have to take the token.. and store it in local storage on their end
			// and every time the client requests a dashboard page (GET dashboard/3), they will have to send the token in 
			res.json({token: token, user: 1})	
		}
	);

	app.get('/dashboard/:id', function(req, res) {

		console.log('------------------', req.headers)
		console.log('Cookies: ', req.cookies["shane_token"])
		// In here, I stripped out the passport stuff.
		// You can choose to add it in later if you see the need for it.
		// But for now we don't quite need it.

		// Ok what do we want to do here?
		// The end goal is to deliver the handlebar dashboard page like we do in the POST /signin route
		// But here, we need to authorize.
		var token = req.cookies["shane_token"];
		var decoded = jwt.verify(token, secret);
		console.log('fuckckckckckckckk')
		console.log('decodedJWT', decoded.id)
		console.log('queryParam', req.params)
		// console.log('headers', req.headers)

		// So what do we need to execute this authorization?
		// 1. We need the id in the query string (the query param).
		// 2. We need the id in the token
		// If they match, then we can deliver the dashboard page
		if (decoded.id.toString() === req.params.id.toString()) {
			console.log('yessssssss')
			res.render("dashboard");
		} else {
			console.log('nooooooooo')
			// else, you should send them to another page or send them a notification, redirect, or something
			// this is up to you and your group
			res.redirect('/dumbass');
		}

	});

	// this is my temp 404 page (unauthorized access)
	// you should probably change this 
	app.get('/dumbass', function(req, res){
		console.log('here')
		res.render('dumbass')
	})	
}







