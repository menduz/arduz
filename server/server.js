var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = process.env.PORT || 8080;

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

app.use('/', express.static('www'));
app.use('/cdn', express.static('cdn'));
app.use('/js', express.static('js'));
app.use('/bower_components', express.static('bower_components'));

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });