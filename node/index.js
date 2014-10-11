var args = require('cli.args')(['socketport:', 'internport:']);

var socketport = args.socketport ? parseInt(args.socketport) : 3000;
var internport = args.socketport ? parseInt(args.internport) : 3001;

// SERVING SOCKET TO CLIENT
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var sockets = {};




http.listen(socketport, function(){
  console.log('listening on *:' + socketport);
});

io.on('connection', function(socket){
    sockets[socket.id] = socket;
    console.log('a user connected');

    console.log("connected users count : " + Object.keys(sockets).length);


    socket.on('disconnect', function () {
        console.log('user disconnected');
        delete sockets[socket.id];

        io.sockets.emit('user disconnected');

        console.log("connected users count : " + Object.keys(sockets).length);
    });

});





// LISTENING TO PHP CONNECTIONS
var appInternal = require('express')();
var bodyParser = require('body-parser');
appInternal.use(bodyParser());
var httpInternal = require('http').Server(appInternal);


appInternal.post('/notification', function(req, res){
    for (var sockId in sockets) {
        sockets[sockId].emit('object changed', req.body);
    }

    res.send('ok');
});



httpInternal.listen(internport, '127.0.0.1', function() {
    console.log('listening on 127.0.0.1:' + internport);
});