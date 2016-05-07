define(['js/adz/mzengine/mzengine'], function(engine){	
	var x = 0, y = 0;

	var width = 0, height = 0, ctx = null;

	var _moviendo = false, AddX = 0, AddY = 0, _continuar = false;
	var UltimoHeading = -1;

	var VelCamara = 192 / 1000;

	this.boundingBox = {
		minX: 0,
		minY: 0,
		maxX: 0,
		maxY: 0
	};

	var tCamPos = this.pos = { x: 0, y: 0 };

	var _check_camera = null;

	mz.copy(this.prototype, mz.eventDispatcher.prototype);
	mz.copy(this, new mz.eventDispatcher);
	mz.eventDispatcher.apply(this);


	this.bindFn = function(cb){
		_check_camera = cb || null;
	};

	this.setSpeed = function(freq){
		this.velCamara = VelCamara = freq || 192 / 1000;
	};

	this.velCamara = VelCamara;

	var map = null;
	require('js/adz/mzengine/map', function(m){ 
		map = m; 
	});

	this.update = function(elapsedTime){
		if(!map) return;
		if(_moviendo){
			if(AddX > 0){
				AddX -= elapsedTime * VelCamara;
				if(AddX <= 0){
					_moviendo = false;
				}
			}
			if(AddX < 0){
				AddX += elapsedTime * VelCamara;
				if(AddX >= 0){
					_moviendo = false;
				}
			} 
			if(AddY > 0){
				AddY -= elapsedTime * VelCamara;
				if(AddY <= 0){
					_moviendo = false;
				}
			}
			if(AddY < 0){
				AddY += elapsedTime * VelCamara;
				if(AddY >= 0){
					_moviendo = false;
				}
			}

			if(!_moviendo){
				_check_camera && _check_camera();
				if(!_moviendo){
					AddY = 0;
					AddX = 0;
				}
			} 
		} else _check_camera && _check_camera();

		this.boundingBox.minX = max(Math.round(x - 50 - 2),0);
		this.boundingBox.minY = max(Math.round(y - 38 - 2),0);
		this.boundingBox.maxX = min(Math.round(x + 50 + 2), map.mapSize);
		this.boundingBox.maxY = min(Math.round(y + 38 + 2), map.mapSize);
		
		tCamPos.x = (x * 32 - AddX) | 0;
		tCamPos.y = (y * 32 - AddY) | 0;

		engine.translate(-tCamPos.x - 16 + 400 | 0, -tCamPos.y - 16 + 300);
	};
	this.unstranslate = function(){
		engine.translate(tCamPos.x + 16 - 400 | 0, tCamPos.y + 16 - 300);
	};
	this.Mover = function(heading){
		if(!_moviendo){
			switch(heading){
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
			this.trigger('moveByHead', heading, x, y);
			this.trigger('position', x, y, tCamPos);
			//myChar.moveByHead(heading)
		}
		_moviendo = true;
	};
	this.setPos = function(_x,_y){
		x = _x | 0;
		y = _y | 0;
		AddY = AddX = 0;
		_moviendo = false;
		tCamPos.x = (x * 32 - AddX) | 0;
		tCamPos.y = (y * 32 - AddY) | 0;
		//this.trigger('position', x, y, tCamPos);
	},
	this.isMoving = function() { return _moviendo; };
	this.getPos = function(){
		return {
			x: tCamPos.x,
			y: tCamPos.y
		}
	}
})