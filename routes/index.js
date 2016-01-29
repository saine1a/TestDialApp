var twilio = require('twilio');
var config = require("../config");

var bodyParser = require('body-parser');
// configure the app to use bodyParser()



// Create a Twilio REST API client for authenticated requests to Twilio
var client = twilio(config.accountSid, config.authToken);

module.exports = function(app) {

    app.use(bodyParser.urlencoded({
	extended: true
    }));
    app.use(bodyParser.json());


    // Set up Handlebars as our view engine

    var handlebars = require('express-handlebars').create( { defaultLayout:'main'});
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');

    // define routes

    // Return TwiML instuctions for the outbound call
    app.post('/outbound', function(request, response) {

	console.log('Outbound request');

        response.type('text/xml')
        response.render('twiml', {layout: false} );
    });


    app.get('/', function(req,res) {
        res.render('home');
    });

    app.get('/about', function(req,res) {

	res.render('about');
    });

    // Add a Rest endpoint for making a call

    app.post('/call', function(req,res) {

        var url = 'http://' + req.headers.host + '/outbound' ;

	console.log(req.body);

	console.log('Calling to ' + req.body.phoneNumber);
	console.log('Calling from ' + config.twilioNumber);
	
        client.makeCall({
            to: req.body.phoneNumber,
            from: config.twilioNumber,
            url: url
        }, function(err,message) {
            console.log(err);
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({
                    message: 'Thank you! We will be calling you shortly.'
                });
            }
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

	

    });
} ;
