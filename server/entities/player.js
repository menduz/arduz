"use strict";
var common_1 = require('../../common');
var Player = (function () {
    function Player() {
        this.key = (Math.random() * 1000000).toString(16);
        this.x = 1;
        this.y = 3;
        this.intervals = {
            useItem: 1000,
            castSpell: 1000
        };
        this.lastTimers = {
            spell: 0,
            attack: 0,
            use: 0
        };
        this.head = (Math.random() * 5) | 0;
        this.body = (Math.random() * 5) | 0;
        this.helmet = (Math.random() * 5) | 0;
        this.weapon = (Math.random() * 5) | 0;
        this.nick = this.key;
        this.heading = common_1.Enums.Heading.South;
    }
    Player.prototype.move = function (heading) {
        if (this.map.canUserMove(this.x, this.y, heading)) {
            var newPos = common_1.Helpers.headToPos(this.x, this.y, heading);
            this.x = newPos.x;
            this.y = newPos.y;
            this.connection.sendToAllButMe(common_1.Packets.SV_MoveChar({
                heading: heading,
                x: newPos.x,
                y: newPos.y,
                player: this.key
            }));
        }
    };
    Player.prototype.NET_createUpdateChar = function () {
        return common_1.Packets.SV_UpdateChar({
            key: this.key,
            x: this.x,
            y: this.y,
            head: this.head,
            body: this.body,
            helmet: this.helmet,
            weapon: this.weapon,
            nick: this.nick,
            shield: this.shield,
            color: this.color,
            heading: this.heading
        });
    };
    return Player;
}());
exports.Player = Player;
