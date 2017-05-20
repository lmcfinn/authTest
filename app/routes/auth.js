

var jwt = require("jsonwebtoken");

var token;
var secret = "1234";

var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport) {

	app.get('/signup', authController.signup);

	app.post('/signin', passport.authenticate('local-signin'), function(req, res) {

		//Get the id of the user(email) who signed in
		console.log("signin", req.user.id);

		var id = req.user.id;

		// create token jwt
		token = jwt.sign({
			id: id,
			admin: false,
		}, secret)

		console.log("token", token)

		res.json({token: token, user: id})	

		// id = id
		// admin = true or false

		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		// res.redirect(`/dashboard/${id}`);
  	});


	app.post('/signup', passport.authenticate('local-signup',
		{ 
	  		successRedirect: '/dashboard/:id',
      		failureRedirect: '/signup'
  		}
	));

	app.get('/dashboard/:id', function(req, res) {
		// console.log('------------------', JSON.parse(req.headers.authorization).token)

		// In here, I stripped out the passport stuff.
		// You can choose to add it in later if you see the need for it.
		// But for now we don't quite need it.

		// Ok what do we want to do here?
		// The end goal is to deliver the handlebar dashboard page like we do in the POST /signin route
		// But here, we need to authorize.
		var decoded = jwt.verify(JSON.parse(req.headers.authorization).token, secret);
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
			res.render('dashboard');
		} else {
			console.log('nooooooooo')
			// else, you should send them to another page or send them a notification, redirect, or something
			// this is up to you and your group
			// res.redirect('/dumbass');
		}

	});




	// app.get('/dashboard/:id',isLoggedIn, authController.dashboard);


	app.get('/logout',authController.logout);


// // app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
// //                                                     failureRedirect: '/signin'}
// //                                                     ));


	// function isLoggedIn(req, res, next) {

	// 	// var decoded = jwt.verify(token, secret);
	// 	// 	console.log("decoded", decoded) 

 //    	if (req.isAuthenticated())
 //    		console.log("zzz", req.isAuthenticated())
 //        	return next();
 //    	res.redirect('/dashboard');
	// }

};






