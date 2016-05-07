define(["require", "exports", 'js/adz/mzengine/mzengine'], function (require, exports, engine) {
    "use strict";
    var x = 0, y = 0;
    var width = 0, height = 0, ctx = null;
    var _moviendo = false, AddX = 0, AddY = 0, _continuar = false;
    var UltimoHeading = -1;
    var VelCamara = 192 / 1000;
    exports.boundingBox = {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0
    };
    exports.pos = { x: 0, y: 0 };
    var _check_camera = null;
    exports.bindFn = function (cb) {
        _check_camera = cb || null;
    };
    exports.setSpeed = function (freq) {
        exports.velCamara = VelCamara = freq || 192 / 1000;
    };
    exports.velCamara = VelCamara;
    var map = null;
    mz.require('js/adz/mzengine/map', function (m) {
        map = m;
    });
    exports.update = function (elapsedTime) {
        if (!map)
            return;
        if (_moviendo) {
            if (AddX > 0) {
                AddX -= elapsedTime * VelCamara;
                if (AddX <= 0) {
                    _moviendo = false;
                }
            }
            if (AddX < 0) {
                AddX += elapsedTime * VelCamara;
                if (AddX >= 0) {
                    _moviendo = false;
                }
            }
            if (AddY > 0) {
                AddY -= elapsedTime * VelCamara;
                if (AddY <= 0) {
                    _moviendo = false;
                }
            }
            if (AddY < 0) {
                AddY += elapsedTime * VelCamara;
                if (AddY >= 0) {
                    _moviendo = false;
                }
            }
            if (!_moviendo) {
                _check_camera && _check_camera();
                if (!_moviendo) {
                    AddY = 0;
                    AddX = 0;
                }
            }
        }
        else
            _check_camera && _check_camera();
        exports.boundingBox.minX = Math.max(Math.round(x - 50 - 2), 0);
        exports.boundingBox.minY = Math.max(Math.round(y - 38 - 2), 0);
        exports.boundingBox.maxX = Math.min(Math.round(x + 50 + 2), map.mapSize);
        exports.boundingBox.maxY = Math.min(Math.round(y + 38 + 2), map.mapSize);
        exports.pos.x = (x * 32 - AddX) | 0;
        exports.pos.y = (y * 32 - AddY) | 0;
        engine.translate(-exports.pos.x - 16 + 400 | 0, -exports.pos.y - 16 + 300);
    };
    exports.unstranslate = function () {
        engine.translate(exports.pos.x + 16 - 400 | 0, exports.pos.y + 16 - 300);
    };
    exports.Mover = function (heading) {
        if (!_moviendo) {
            switch (heading) {
                case 0:
                    AddY += 32;
                    AddX = 0;
                    y++;
                    break;
                case 1:
                    AddX += 32;
                    AddY = 0;
                    x++;
                    break;
                case 2:
                    AddY -= 32;
                    AddX = 0;
                    y--;
                    break;
                case 3:
                    AddX -= 32;
                    AddY = 0;
                    x--;
                    break;
            }
            exports.observable.trigger('moveByHead', heading, x, y);
            exports.observable.trigger('position', x, y, exports.pos);
        }
        _moviendo = true;
    };
    exports.setPos = function (_x, _y) {
        x = _x | 0;
        y = _y | 0;
        AddY = AddX = 0;
        _moviendo = false;
        exports.pos.x = (x * 32 - AddX) | 0;
        exports.pos.y = (y * 32 - AddY) | 0;
    };
    exports.isMoving = function () { return _moviendo; };
    exports.getPos = function () {
        return {
            x: exports.pos.x,
            y: exports.pos.y
        };
    };
    exports.observable = new mz.EventDispatcher();
});
