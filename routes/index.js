var twilio = require('twilio');
var config = require("../config");

// Create a Twilio REST API client for authenticated requests to Twilio
var client = twilio(config.accountSid, config.authToken);

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

    // Add a Rest endpoint for making a call

    app.post('/call', function(request,response) {

        var url = 'http://' + request.headers.host + '/outbound' ;

        client.makeCall({
            to: request.body.phoneNumber,
            from: config.twilioNumber,
            url: url
        }, function(err,message) {
            console.log(err);
            if (err) {
                response.status(500).send(err);
            } else {
                response.send({
                    message: 'Thank you! We will be calling you shortly.'
                });
            }
        });
    });
} ;
