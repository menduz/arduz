define(['js/adz/mzengine/mzengine', 'js/adz/mzengine/textures', 'js/adz/mzengine/map', 'js/adz/mzengine/input', 'js/adz/mzengine/camera', 'js/adz/game/body'], function(engine,textures,map, input, Camera, bodies){
	var that = this;
	var Grh = textures.Grh;

	this.mainChar = null;

	this.BodyFactory = (function(){
		return function(body, head, alto){
			var _x = 0;
			var _y = 0;

			var AddX = 0, AddY = 0;

			var _heading = 0;

			var enMovimiento = false;

			console.log(bodies)

			var Body = new bodies.Body();

			Body.setBody(body);
			Body.setHead(head);

			return {
				body: Body,//IniciarCuerpo(body, 'cdn/grh/cuerpos/'+body+'.png'),
				render: function(elapsedTime,x,y){


					if(arguments.length == 1){
						x = _x * map.tileSize - AddX;
						y = _y * map.tileSize - AddY;
					}
					
					if(this == that.mainChar){
						x = Camera.pos.x;
						y = Camera.pos.y;
					}
					
					if(AddX > 0){
						AddX -= elapsedTime * Camera.velCamara;
						if(AddX <= 0){
							enMovimiento = false;
						}
					}
					if(AddX < 0){
						AddX += elapsedTime * Camera.velCamara;
						if(AddX >= 0){
							enMovimiento = false;
						}
					} 
					if(AddY > 0){
						AddY -= elapsedTime * Camera.velCamara;
						if(AddY <= 0){
							enMovimiento = false;
						}
					}
					if(AddY < 0){
						AddY += elapsedTime * Camera.velCamara;
						if(AddY >= 0){
							enMovimiento = false;
						}
					}

					/*
					var tmpx = x - ((AnchoCuerpos / 2) | 0) + 16;
					var tmpy = y - AltoCuerpos + 16;

					
					this.body[_heading][
						!enMovimiento ? 0 : ((engine.tick / 60) | 0) % this.body[_heading].length
					](tmpx,tmpy);

					this.head[_heading](x + 8,tmpy - 8);
					*/

					this.body && this.body.render(x,y,_heading,enMovimiento)

				},
				setPos: function(x,y){
					enMovimiento = false;
					_x = x;
					_y = y;
					AddX = 0;
				 	AddY = 0;
				},
				moveByHead: function(heading){

					switch(heading){
						case 0:
							AddY = map.tileSize;
							AddX = 0;
							_y++;
							break;
						case 1:
							AddX = map.tileSize;
							AddY = 0;
							_x++;
							break;
						case 2:
							AddY = -map.tileSize;
							AddX = 0;
							_y--;
							break;
						case 3:
							AddX = -map.tileSize;
							AddY = 0;
							_x--;
							break;
					}
					_heading = heading;
					enMovimiento = true;
				},
				frenar: function(){
					enMovimiento = false;
					AddX = 0;
				 	AddY = 0;
				},
				enMovimiento: function(){ return enMovimiento; },
				setHeading: function(heading){
					_heading = heading;
				}
			}
		}
	})();

	this.render = function(x, y){
		
	}

	this.chars = [];
});