const express = require("express");
const db = require("./models");
const bodyParser = require("body-parser");
var passport     = require('passport');
var session      = require('express-session');
var env          = require('dotenv').load();
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
const methodOverride = require("method-override");

const PORT = process.env.PORT || 8000;
const app = express();

 // For Cookie parser
 app.use(cookieParser())

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!

 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app,passport);

//load passport strategies
require('./config/passport/passport.js')(passport,models.user);

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");
var handlebars = require("handlebars");
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use("/", routes);

app.use(express.static(__dirname + '/public/assets'));

// Routes =============================================================
// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Larocha Health Server - listening on PORT: " + PORT);
    });
});