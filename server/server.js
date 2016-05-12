var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = process.env.PORT || 8080
    , UserConnection = require('./userConnection').UserConnection
    , ClientLogic = require('./clientLogic').ClientLogic;

wss.on('connection', function connection(ws) {
    var userConnection = new UserConnection(ws);
    var clientLogic = new ClientLogic(userConnection);
});

app.use('/', express.static('www'));
app.use('/cdn', express.static('cdn'));
app.use('/js', express.static('js'));
app.use('/bower_components', express.static('bower_components'));

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });