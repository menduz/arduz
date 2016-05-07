"use strict";

process.title = 'ArduzServer';

var webSocketsServerPort = 7666;
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [ ];

var MaxUsers = 4;



var server = http.createServer(function(request, response) {});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin);

    if(clients.length == MaxUsers){
        console.log('-> Max Users. Conexion rechazada');
        return;
    }

    var connection = request.accept(null, request.origin); 
    
    var index = clients.push(connection) - 1;

    console.log(' Hola: ' + index);

    // send back chat history
    connection.sendUTF('Hola ' + index);

    // user sent some message
    connection.on('message', function(message) {
        console.log(message.utf8Data);
    });

    // user disconnected
    connection.on('close', function(connection) {
        console.log(" Chau: " + index);
        clients.splice(index, 1);
    });
});