import * as engine from './mzengine';

var x = 0, y = 0;

var width = 0, height = 0, ctx = null;

var _moviendo = false, AddX = 0, AddY = 0, _continuar = false;
var UltimoHeading = -1;

var VelCamara = 192 / 1000;

export var boundingBox = {
	minX: 0,
	minY: 0,
	maxX: 0,
	maxY: 0
};

export var pos = { x: 0, y: 0 };

var _check_camera = null;


export var bindFn = function (cb) {
	_check_camera = cb || null;
};

export var setSpeed = function (freq) {
	velCamara = VelCamara = freq || 192 / 1000;
};

export var velCamara = VelCamara;

var map = require('./map');

export var update = function (elapsedTime) {
	if (!map) return;
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
	} else _check_camera && _check_camera();

	boundingBox.minX = Math.max(Math.round(x - 50 - 2), 0);
	boundingBox.minY = Math.max(Math.round(y - 38 - 2), 0);
	boundingBox.maxX = Math.min(Math.round(x + 50 + 2), map.mapSize);
	boundingBox.maxY = Math.min(Math.round(y + 38 + 2), map.mapSize);

	pos.x = (x * 32 - AddX) | 0;
	pos.y = (y * 32 - AddY) | 0;

	engine.translate(-pos.x - 16 + 400 | 0, -pos.y - 16 + 300);
};
export var unstranslate = function () {
	engine.translate(pos.x + 16 - 400 | 0, pos.y + 16 - 300);
};
export var Mover = function (heading) {
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
		observable.trigger('moveByHead', heading, x, y);
		observable.trigger('position', x, y, pos);
	}
	_moviendo = true;
};
export var setPos = function (_x, _y) {
	x = _x | 0;
	y = _y | 0;
	AddY = AddX = 0;
	_moviendo = false;
	pos.x = (x * 32 - AddX) | 0;
	pos.y = (y * 32 - AddY) | 0;
}
export var isMoving = function () { return _moviendo; };
export var getPos = function () {
	return {
		x: pos.x,
		y: pos.y
	}
}

export var observable = new mz.EventDispatcher();