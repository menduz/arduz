"use strict";
var packet_1 = require('../common/packet');
var protocol_1 = require('../common/protocol');
var packets_1 = require('../common/packets');
var areaWidth = 16;
var areaHeight = 12;
var halfAreaWidth = Math.floor(areaWidth / 2) + 1;
var halfAreaHeight = Math.floor(areaHeight / 2) + 1;
exports.ConnectionList = [];
var UserConnection = (function () {
    function UserConnection(connection) {
        var _this = this;
        this.connection = connection;
        this.tape = new protocol_1.WireProtocol.Tape;
        console.log('Opening connection.');
        connection.on('close', function (error) {
            var index = exports.ConnectionList.indexOf(_this);
            if (index != -1) {
                exports.ConnectionList.splice(index, 1);
            }
            _this.tape.emit(packets_1.PacketCodes.Disconnected.toString());
            console.log('\tActive connections: ' + exports.ConnectionList.length);
        });
        exports.ConnectionList.push(this);
        connection.on('message', function (data, flags) {
            try {
                _this.tape.handlePacket(data);
            }
            catch (e) {
                _this.close();
            }
        });
        console.log('\tActive connections: ' + exports.ConnectionList.length);
    }
    UserConnection.prototype.sendToAllButMe = function (packet) {
        var _this = this;
        exports.ConnectionList.forEach(function (userConnection) {
            if (userConnection == _this)
                return;
            userConnection.send(packet);
        });
    };
    UserConnection.prototype.sendToArea = function (packet) {
        if (!this.player || !this.player.map)
            return;
        sendToArea(packet, this.player.map, this.player.x, this.player.y);
    };
    UserConnection.prototype.sendToMap = function (packet) {
        if (!this.player || !this.player.map)
            return;
        sendToMap(packet, this.player.map);
    };
    UserConnection.prototype.send = function (packet) {
        if (packet instanceof packet_1.SimplePacket) {
            console.log('>>' + packets_1.PacketCodes[packet.id] + ":" + JSON.stringify(packet.data));
            this.connection.send(packet.serialize());
        }
        else {
            console.log('>>RAW: ' + +JSON.stringify(packet));
            this.connection.send(packet);
        }
    };
    UserConnection.prototype.close = function () {
        console.log('Closing connection...');
        this.connection.close();
    };
    return UserConnection;
}());
exports.UserConnection = UserConnection;
function sendToAll(packet) {
    exports.ConnectionList.forEach(function (userConnection) { return userConnection.connection.send(packet); });
}
exports.sendToAll = sendToAll;
function sendToArea(packet, map, x, y) {
    exports.ConnectionList.forEach(function (userConnection) {
        if (userConnection.player && (null == map || userConnection.player.map == map)) {
            if (userConnection.player.x < (x - halfAreaWidth)
                ||
                    userConnection.player.x > (x + halfAreaWidth)
                ||
                    userConnection.player.y < (y - halfAreaHeight)
                ||
                    userConnection.player.y > (y + halfAreaHeight))
                return;
            userConnection.connection.send(packet);
        }
    });
}
exports.sendToArea = sendToArea;
function sendToMap(packet, map) {
    exports.ConnectionList.forEach(function (userConnection) {
        if (userConnection.player && (null == map || userConnection.player.map == map)) {
            userConnection.connection.send(packet);
        }
    });
}
exports.sendToMap = sendToMap;
function sendTo(packet, filter) {
    exports.ConnectionList.forEach(function (userConnection) {
        if (filter(userConnection.player)) {
            userConnection.connection.send(packet);
        }
    });
}
exports.sendTo = sendTo;
