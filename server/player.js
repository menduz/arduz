"use strict";
var Player = (function () {
    function Player() {
        this.intervals = {
            useItem: 1000,
            castSpell: 1000
        };
        this.lastTimers = {
            spell: 0,
            attack: 0,
            use: 0
        };
    }
    Player.prototype.move = function (heading) {
        if (this.map.canUserMove(this.x, this.y, heading)) {
        }
    };
    return Player;
}());
exports.Player = Player;
