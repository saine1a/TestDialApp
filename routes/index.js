module.exports = function(app) {

    // Set up Handlebars as our view engine

    var handlebars = require('express3-handlebars').create( { defaultLayout:'main'});
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');

    // define routes

    app.get('/', function(req,res) {
        res.render('home');
    });


    app.use(function(req,res) {
        res.status(404);
        res.render('404');
    });

    app.use(function(err,req,res,next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });
} ;
