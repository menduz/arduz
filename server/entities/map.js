"use strict";
var common_1 = require('../../common');
var conn = require('../net/userConnection');
var MapBlock = (function () {
    function MapBlock() {
        this.blocked = false;
    }
    return MapBlock;
}());
exports.MapBlock = MapBlock;
var Map = (function () {
    function Map(size) {
        if (size === void 0) { size = 255; }
        this.size = size;
        this.blocks = [];
        this.players = {};
        this.key = "base-map";
        this.blocks = [];
        exports.MapDictionary[this.key] = this;
        for (var x = 0; x < size; x++) {
            var row = [];
            this.blocks.push(row);
            for (var y = 0; y < size; y++) {
                row.push(new MapBlock);
            }
        }
    }
    Map.prototype.canUserMove = function (x, y, heading) {
        return true;
    };
    Map.prototype.addPlayer = function (player, x, y) {
        player.connection.send(common_1.Packets.SV_SetMap({
            key: this.key
        }));
        this.players[player.key] = player;
        player.map = this;
        conn.sendToMap(player.NET_createUpdateChar(), this);
        for (var p in this.players) {
            if (this.players[p] !== player) {
                player.connection.send(this.players[p].NET_createUpdateChar());
            }
        }
    };
    Map.prototype.removePlayer = function (player) {
        delete this.players[player.key];
        this.removeFromTile(player);
        conn.sendToMap(common_1.Packets.SV_RemoveChar({ player: player.key, map: this.key }), this);
    };
    Map.prototype.removeFromTile = function (player) {
    };
    return Map;
}());
exports.Map = Map;
exports.MapDictionary = {};
exports.LandingMap = new Map;
