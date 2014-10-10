// SERVING SOCKET TO CLIENT
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var sockets = {};




http.listen(3000, function(){
  console.log('listening on *:3000');
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
var httpInternal = require('http').Server(appInternal);


appInternal.post('/notification', function(req, res){
    res.send('ok');
});



httpInternal.listen(3001, '127.0.0.1', function() {
    console.log('listening on 127.0.0.1:3001');
});