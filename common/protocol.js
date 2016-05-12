"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var packet_1 = require('./packet');
var WireProtocol;
(function (WireProtocol) {
    var Tape = (function (_super) {
        __extends(Tape, _super);
        function Tape() {
            _super.apply(this, arguments);
        }
        Tape.prototype.handlePacket = function (raw) {
            var packet = packet_1.SimplePacket.fromRaw(raw);
            this.emit(packet.id.toString(), packet.data, packet);
        };
        return Tape;
    }(events_1.EventEmitter));
    WireProtocol.Tape = Tape;
})(WireProtocol = exports.WireProtocol || (exports.WireProtocol = {}));
