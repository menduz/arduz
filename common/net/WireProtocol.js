"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var SimplePacket_1 = require('./SimplePacket');
var WireProtocol;
(function (WireProtocol) {
    var Tape = (function (_super) {
        __extends(Tape, _super);
        function Tape() {
            _super.apply(this, arguments);
        }
        Tape.prototype.handlePacket = function (raw) {
            var packet = SimplePacket_1.SimplePacket.fromRaw(raw);
            this.emit(Tape.ON_EVERY_CODE, packet.id, packet.data);
            this.emit(packet.id.toString(), packet.data, packet);
        };
        Tape.prototype.when = function (packet, callback) {
            this.on(packet.toString(), callback);
            return this;
        };
        Tape.prototype.onEvery = function (callback) {
            this.on(Tape.ON_EVERY_CODE, callback);
            return this;
        };
        Tape.ON_EVERY_CODE = '-1';
        return Tape;
    }(events_1.EventEmitter));
    WireProtocol.Tape = Tape;
    var TapeHandler = (function () {
        function TapeHandler(tape) {
            var _this = this;
            this.tape = tape;
            this.handlers = {};
            tape.onEvery(function (packet, data) {
                if (packet in _this.handlers)
                    _this.handlers[packet](data);
                else
                    console.error(packet + " NOT IMPLEMENTED!!!!");
            });
        }
        return TapeHandler;
    }());
    WireProtocol.TapeHandler = TapeHandler;
})(WireProtocol = exports.WireProtocol || (exports.WireProtocol = {}));
