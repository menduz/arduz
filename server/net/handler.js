"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('../../common');
var userConnection_1 = require('./userConnection');
var map = require('../entities/map');
var player_1 = require('../entities/player');
var p = common_1.Packets.PacketCodes;
var Handler = (function (_super) {
    __extends(Handler, _super);
    function Handler(userConnection) {
        var _this = this;
        _super.call(this, userConnection.tape);
        this.userConnection = userConnection;
        this.handlers = (_a = {},
            _a[p.CLI_Initialize] = function (data) {
                var player = _this.userConnection.player = _this.userConnection.player || new player_1.Player();
                player.connection = _this.userConnection;
                map.LandingMap.addPlayer(player, 0 | (10 * Math.random()), 0 | (10 * Math.random()));
                _this.userConnection.send(common_1.Packets.SV_SetPlayerKey({
                    player: player.key
                }));
                _this.userConnection.send(player.NET_createUpdateChar());
            },
            _a[p.CLI_Walk] = function (data) {
                _this.userConnection.player.move(data.heading);
            },
            _a[p.CLI_Talk] = function (data) {
                userConnection_1.sendToAll(common_1.Packets.SV_Talk({
                    player: _this.userConnection.player && _this.userConnection.player.key,
                    nick: _this.userConnection.player && _this.userConnection.player.nick,
                    text: data.text
                }));
            },
            _a[p.EVT_Disconnected] = function () {
                if (_this.userConnection.player && _this.userConnection.player.map)
                    _this.userConnection.player.map.removePlayer(_this.userConnection.player);
                console.log("Disconnected", _this.userConnection.player.nick);
            },
            _a
        );
        this.userConnection.send(common_1.Packets.SV_Welcome({}));
        var _a;
    }
    return Handler;
}(common_1.WireProtocol.TapeHandler));
exports.Handler = Handler;
