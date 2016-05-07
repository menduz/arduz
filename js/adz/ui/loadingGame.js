var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'js/adz/mzengine/mzengine', 'js/adz/mzengine/textures', 'js/adz/mzengine/window'], function (require, exports, engine, textures, win) {
    "use strict";
    var LoadingWindow = (function (_super) {
        __extends(LoadingWindow, _super);
        function LoadingWindow() {
            _super.apply(this, arguments);
            this.value = 0;
            this.offX = 400;
            this.offY = 300;
        }
        LoadingWindow.prototype.show = function () {
            this.value = 0;
            _super.prototype.show.call(this);
        };
        LoadingWindow.prototype.hide = function () {
            this.value = 0;
            _super.prototype.hide.call(this);
        };
        LoadingWindow.prototype.render = function () {
            if (this.value) {
                var that = this;
                engine.renderThisUI(function (ctx) {
                    var circ = Math.PI * 2;
                    var quart = Math.PI / 2;
                    ctx.strokeStyle = '#FF1100';
                    ctx.lineCap = 'round';
                    ctx.lineWidth = 20.0;
                    ctx.beginPath();
                    ctx.arc(that.offX, that.offY, 150, -quart, circ * that.value - quart, false);
                    ctx.stroke();
                });
            }
            engine.drawImage(textures.get('cdn/adz.png'), 80, 60, 640, 480);
        };
        LoadingWindow.prototype.setProgress = function (value, min) {
            if (arguments.length == 2) {
                this.value = min / value;
            }
            else {
                this.value = value || 0;
            }
        };
        return LoadingWindow;
    }(win.MzWindow));
    return new LoadingWindow;
});
