var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var keyStateObserver = (function (_super) {
        __extends(keyStateObserver, _super);
        function keyStateObserver() {
            var _this = this;
            _super.call(this);
            this.keyStates = {};
            $(document).keydown(function (e) { return _this.keyDown(e.keyCode.toString()); });
            $(document).keyup(function (e) { return _this.keyUp(e.keyCode.toString()); });
        }
        keyStateObserver.prototype.keyDown = function (cual) {
            this.keyStates[cual] = true;
            this.emit(cual, true);
        };
        keyStateObserver.prototype.keyUp = function (cual) {
            this.keyStates[cual] = false;
            this.emit(cual, false);
        };
        keyStateObserver.prototype.check = function (cual) {
            return !!this.keyStates[cual];
        };
        return keyStateObserver;
    }(mz.EventDispatcher));
    exports.KeyStates = new keyStateObserver;
});
