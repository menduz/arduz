"use strict";
var protocol_1 = require('../../../common/protocol');
var packets_1 = require('../../../common/packets');
var client = null;
exports.tape = new protocol_1.WireProtocol.Tape();
function connect(username) {
    if (client && client.readyState == client.OPEN) {
        console.error("[CLI] Alredy connected");
        return;
    }
    client = new WebSocket("ws://" + location.host + "/__c/" + username);
    exports.tape.emit(packets_1.PacketCodes.Disconnected.toString());
    client.onclose = function () {
        client = null;
        exports.tape.emit(packets_1.PacketCodes.Disconnected.toString());
    };
    client.onopen = function () {
        exports.tape.emit(packets_1.PacketCodes.Connected.toString());
    };
    client.onmessage = function (message) {
        exports.tape.handlePacket(message.data);
    };
}
exports.connect = connect;
