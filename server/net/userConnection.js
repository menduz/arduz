"use strict";
var common_1 = require('../../common');
var areaWidth = 16;
var areaHeight = 12;
var halfAreaWidth = Math.floor(areaWidth / 2) + 1;
var halfAreaHeight = Math.floor(areaHeight / 2) + 1;
exports.ConnectionList = [];
var UserConnection = (function () {
    function UserConnection(connection) {
        var _this = this;
        this.connection = connection;
        this.player = null;
        this.tape = new common_1.WireProtocol.Tape;
        console.log('Connection opened.');
        connection.on('close', this.WS_HandleError.bind(this));
        connection.on('message', this.WS_HandleMessage.bind(this));
        connection.on('error', console.trace.bind(console));
        exports.ConnectionList.push(this);
        console.log('\tActive connections: ' + exports.ConnectionList.length);
        setImmediate(function () {
            return _this.tape.emit(common_1.Packets.PacketCodes.EVT_Connected.toString());
        });
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
    UserConnection.prototype.sendToMap = function (packet, includeMyself) {
        if (includeMyself === void 0) { includeMyself = true; }
        if (!this.player || !this.player.map)
            return;
        sendToMap(packet, this.player.map, includeMyself ? null : this.player);
    };
    UserConnection.prototype.send = function (packet) {
        console.log('<<' + common_1.Packets.PacketCodes[packet.id] + ":", JSON.stringify(packet.data));
        this.connection.send(packet.serialize());
    };
    UserConnection.prototype.WS_HandleError = function (error) {
        console.log('Connection closed.');
        var index = exports.ConnectionList.indexOf(this);
        if (index != -1) {
            exports.ConnectionList.splice(index, 1);
        }
        this.tape.emit(common_1.WireProtocol.Tape.ON_EVERY_CODE, common_1.Packets.PacketCodes.EVT_Disconnected, {});
        this.tape.emit(common_1.Packets.PacketCodes.EVT_Disconnected.toString());
        console.log('\tActive connections: ' + exports.ConnectionList.length);
    };
    UserConnection.prototype.WS_HandleMessage = function (data, flags) {
        try {
            this.tape.handlePacket(data);
        }
        catch (e) {
            console.trace(e);
            this.close();
        }
    };
    UserConnection.prototype.close = function () {
        console.log('Closing connection...');
        this.connection.close();
    };
    return UserConnection;
}());
exports.UserConnection = UserConnection;
function sendToAll(packet, excludePlayer) {
    if (excludePlayer === void 0) { excludePlayer = null; }
    exports.ConnectionList.forEach(function (userConnection) {
        if (null == excludePlayer || excludePlayer != userConnection.player)
            userConnection.send(packet);
    });
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
            userConnection.send(packet);
        }
    });
}
exports.sendToArea = sendToArea;
function sendToMap(packet, map, excludePlayer) {
    if (excludePlayer === void 0) { excludePlayer = null; }
    exports.ConnectionList.forEach(function (userConnection) {
        if (userConnection.player
            && (null == map || userConnection.player.map == map)
            && (null == excludePlayer || excludePlayer != userConnection.player)) {
            userConnection.send(packet);
        }
    });
}
exports.sendToMap = sendToMap;
function sendTo(packet, filter) {
    exports.ConnectionList.forEach(function (userConnection) {
        if (filter(userConnection.player)) {
            userConnection.send(packet);
        }
    });
}
exports.sendTo = sendTo;
