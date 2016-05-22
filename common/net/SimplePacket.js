"use strict";
var packets_1 = require('../protocol/packets');
var SimplePacket = (function () {
    function SimplePacket(id, data) {
        this.id = id;
        this.data = data;
    }
    SimplePacket.prototype.serialize = function () {
        var raw = JSON.stringify({
            id: this.id,
            data: this.data
        });
        return raw;
    };
    SimplePacket.fromRaw = function (raw) {
        try {
            var parsed = JSON.parse(raw);
            if (parsed.id) {
                console.log('>>' + packets_1.PacketCodes[parsed.id] + ': ' + JSON.stringify(parsed.data));
                return new SimplePacket(parsed.id, parsed.data);
            }
            else
                throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw));
        }
        catch (e) {
            console.error("ERROR PARSING MESSAGE", e, raw);
            throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw));
        }
    };
    return SimplePacket;
}());
exports.SimplePacket = SimplePacket;
