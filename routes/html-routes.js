// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var moment = require('moment');
moment().format();


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
    app.get('/', function(req,res){
        res.render('home');
    });

    app.get('/home', function(req,res){
        res.render('home');
    });

    app.get('/team', function(req,res){
        res.render('team');
    });

    app.get('/event', function(req,res){
        // findAll returns all entries for a table when used with no options
        db.Event.findAll({}).then(function(dbEvent) {
            // console.log('dbEvent: ',dbEvent);
            res.render('event',  { event: dbEvent });
        });
    });

    app.get('/blog', function(req,res){
        res.render('blog');
    });

    app.get('/services', function(req,res){
        res.render('services');
    });

    // app.get('/myprofile', function(req,res){
    //     res.render('myprofile');
    // });

  
    

    app.get('/contact', function(req,res){
        res.render('contact');
    });

    app.get('/admin', function(req,res){
        res.render('admin');
    });

    app.use(function(req,res){
        res.status(404);
        res.render('404');
    });

};
