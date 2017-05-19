

var jwt = require("jsonwebtoken");

var token;
var secret = "1234";

var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

// app.get('/signup', authController.signup);
// app.get('/signin', authController.signin);
// POST route for saving a new todo
// app.post("/signin", function(req, res) {
// 	console.log('---------jjj-----------')
// 	passport.authenticate(
// 		'local', 
// 		{ successRedirect: '/dashboard',
//       	  failureRedirect: '/signin'
//   		}
// 	)
// });

app.post('/signin',
	passport.authenticate('local-signin'),
	function(req, res) {

		//Get the id of the user(email) who signed in
		console.log("jjj", res.req.user.id);

		// console.log("xxx", `/dashboard/${id}`); 

		var id = 3;

		// create token jwt
		token = jwt.sign({
			id: id,
			admin: false,
		}, secret)

		console.log("token", token)

		// id = id
		// admin = true or false

		



		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		res.redirect(`/dashboard/${id}`);
	  // res.redirect("/dashboard");
  });



// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login' }));



app.post('/signup', passport.authenticate('local-signup',  
	
				//Added :id after dashboard/ 
	{ successRedirect: '/dashboard',
      failureRedirect: '/signup'
  	}
));


app.get('/dashboard/:id',isLoggedIn, authController.dashboard);


app.get('/logout',authController.logout);


// app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
//                                                     failureRedirect: '/signin'}
//                                                     ));


function isLoggedIn(req, res, next) {

	var decoded = jwt.verify(token, secret);
		console.log("decoded", decoded) 

	// queryaParams
	// token

	// open token 
	// see id

	// if admin = true 
	// if id === queryParamId
	// show page 

    if (req.isAuthenticated())
    	console.log("zzz", req.isAuthenticated())
        return next();
// if (authorized)
    res.redirect('/signin');
}


}






