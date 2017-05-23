var exports = module.exports = {}


exports.signup = function(req,res){

	res.render('signup'); 

}


exports.dashboard = function(req,res){

	res.render('dashboard'); 

}

exports.dumbass = function (req, res) {
	res.render("dumbass");
}




//NOT USED
// exports.signin = function(req,res){

// 	res.render('signin'); 

// }

// exports.logout = function(req,res){

//   req.session.destroy(function(err) {
//   res.redirect('/signup');
//   });

// }

// exports.dumbass = function (req, res) {
// 	res.render("dumbass");
// }

