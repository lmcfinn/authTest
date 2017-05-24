
var express = require('express');
var jwt = require("jsonwebtoken");
var authController = require('../controllers/authcontroller.js');
var db = require("../models");
// var path = require("path");
// var moment = require('moment');
// moment().format();

//For JsonWebToken
var token;
var secret = "1234";

module.exports = function(app, passport){

	app.get('/login', authController.login);

	app.get('/unauthorized', authController.unauthorized);

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
	app.get('/myprofile/:id', function(req, res) {

		//Confirm the sign in user's id
		console.log('reqParams', req.params)
		//Confirm token is inside the cookie
		console.log('cookies: ', req.cookies["user_token"])
		
		//Verify if the token sent from the server 
		var token = req.cookies["user_token"];
		var decoded = jwt.verify(token, secret);

		//Check if the id in the token matches the id in the query string
		if (decoded.id.toString() === req.params.id.toString()) {
			console.log('yessssssss')
			
			db.User.findOne({
				where: {
					id: req.params.id
				} 
			}).then(function(dbUser) {
				console.log("dbUser", dbUser)
            	res.render("myprofile", {email: dbUser.email}, {last_login: db.User.last_login})
        	})

        	// res.render("myprofile");

		} else {
			// console.log('nooooooooo')
			//If not matched, redirect to 404
			res.redirect('/unauthorized');
		}
	});	



	//Log out
	app.get('/logout', function(req, res){
  		req.logout();
  		res.redirect('/signup');
	});
};





	








