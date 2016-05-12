"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ventanas = [];
var vPush = function (v) {
    var ind = -1;
    if ((ind = ventanas.indexOf(v)) != -1) {
        ventanas.push(ventanas.splice(ind, 1)[0]);
    }
    else {
        ventanas.push(v);
    }
};
var vPop = function (v) {
    var ind = -1;
    if ((ind = ventanas.indexOf(v)) != -1) {
        ventanas.splice(ind, 1);
    }
};
var MzWindow = (function (_super) {
    __extends(MzWindow, _super);
    function MzWindow() {
        _super.apply(this, arguments);
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }
    MzWindow.prototype.show = function () {
        vPush(this);
        this.trigger('show');
    };
    MzWindow.prototype.hide = function () {
        vPop(this);
        this.trigger('hide');
    };
    MzWindow.prototype.setSize = function (w, h) {
        this.width = w | 0;
        this.height = h | 0;
        this.trigger('resize');
    };
    MzWindow.prototype.setPos = function (x, y) {
        this.x = x | 0;
        this.y = y | 0;
    };
    MzWindow.prototype.isVisible = function () {
        return ventanas.indexOf(this) != -1;
    };
    return MzWindow;
}(mz.EventDispatcher));
exports.MzWindow = MzWindow;
function render() {
    ventanas.forEach(function (e) { e.render(); });
}
exports.render = render;
function isVisible(window) {
    return window && ventanas.indexOf(window) != -1;
}
exports.isVisible = isVisible;
