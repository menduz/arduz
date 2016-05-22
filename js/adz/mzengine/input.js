"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var keyStateObserver = (function (_super) {
    __extends(keyStateObserver, _super);
    function keyStateObserver() {
        _super.apply(this, arguments);
        this.keyStates = {};
    }
    keyStateObserver.prototype.keyDown = function (cual) {
        this.keyStates[cual] = true;
        this.emit(cual, true);
        this.emit('key_down', cual);
        this.emit('key_down_' + cual);
    };
    keyStateObserver.prototype.keyUp = function (cual) {
        this.keyStates[cual] = false;
        this.emit(cual, false);
        this.emit('key_up', cual);
        this.emit('key_up_' + cual);
    };
    keyStateObserver.prototype.check = function (cual) {
        return !!this.keyStates[cual];
    };
    keyStateObserver.prototype.appendTo = function (element) {
        var _this = this;
        $(element || document).keydown(function (e) { return _this.keyDown(e.keyCode.toString()); });
        $(element || document).keyup(function (e) { return _this.keyUp(e.keyCode.toString()); });
    };
    return keyStateObserver;
}(mz.EventDispatcher));
exports.KeyStates = new keyStateObserver;
