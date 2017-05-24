var exports = module.exports = {}


exports.login = function(req,res){

	res.render('login'); 

}


exports.unauthorized = function (req, res) {
	res.render("unauthorized");
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

// exports.dashboard = function(req,res){

// 	res.render('dashboard'); 

// }
