var config = require('./config');
var server = require ( './server' );

// listen

server.listen(config.port, function() {
    console.log('Express started on http://localhost:' + config.port + '; Ctrl-C to terminate');
});
