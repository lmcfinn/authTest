
var express = require('express');
var jwt = require("jsonwebtoken");
var authController = require('../controllers/authcontroller.js');

var token;
var secret = "1234";

module.exports = function(app, passport){

	app.get('/signup', authController.signup);

	app.get('/dumbass', authController.dumbass);

	//Authenitcate signing up
	app.post("/signup", passport.authenticate("local-signup"), function(req, res, next) {

		var userId = req.user.dataValues.id;
		console.log("new user id", userId) 

		//Create a token 
		token = jwt.sign({
					id: userId,
				}, secret);

		//Send the token to the browser/client so that app.get("/dashboard:id") can access it
		res.json({token: token, user: userId});	
	});

	//Authenticate signing in
	app.post('/signin', function(req, res, next) {
		passport.authenticate('local-signin', function(err, user, info) 
			{
	    		console.log("signin user", user)

	    		if(err) {
	    			console.log("sign in err")
	    		}
			    
			    //If no user, send {user: false} to browser/clinet so that browser can use that info
			    if (!user) {
			    	// console.log("no user err")
			    	return res.json({user: false})

			    } else {
			    	//If there is a user, create a token
					token = jwt.sign({
								id: user.id,
							}, secret);

					//Return the token to browswer/client
					return res.json({token: token, user: user.id})	
			    }
  		})(req, res, next);
	});

	//Process the token/cookie sent to the browser/client
	app.get('/dashboard/:id', function(req, res) {

		console.log('reqParams', req.params)
		console.log('cookies: ', req.cookies["user_token"])
		
		//Verify if the token sent from the server 
		var token = req.cookies["user_token"];
		var decoded = jwt.verify(token, secret);

		//Check if the id in the token matches the id in the query string
		if (decoded.id.toString() === req.params.id.toString()) {
			// console.log('yessssssss')
			//If matched, render dashboard
			res.render("dashboard");
		} else {
			// console.log('nooooooooo')
			//If not matched, redirect to 404
			res.redirect('/dumbass');
		}
	});	

	//Log out
	app.get('/logout', function(req, res){
  		req.logout();
  		res.redirect('/signup');
	});
};





	//NOT USED
	// app.post('/signin', passport.authenticate('local-signin'), function(req, res, next) {

	// 	console.log("sejimei")

	// 		// if we are in this function, that means that passport auth'd the email/password combo

	// 		// first thing we do, is we get the user info
	// 		// we couldnt figure this out on Friday... fucking so easy
	//     	var user = req.user;

	//     	// Next we create a JSON Web Token with all the information we need inside.
	//     	// For now, lets just put the id. We might want to add admin priviledges later
	// 		token = jwt.sign({
	// 			id: user.id,
	// 		}, secret)

	// 		console.log('token', token)
	// 		// we respond with a json with the token in it.
	// 		// now the client (browser) will have to take the token.. and store it in local storage on their end
	// 		// and every time the client requests a dashboard page (GET dashboard/3), they will have to send the token in 
	// 		res.json({token: token, user: user.id})	
	// 	}
	// );








