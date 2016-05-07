define(['js/adz/mzengine/mzengine', 'js/adz/mzengine/camera', 'js/adz/mzengine/textures'], function(engine, Camera, textures){	
	var that = this;

	that.Tile = function Tile(){

	}
	
	that.Tile.prototype.piso = null;

	that.Tile.prototype.capa1 = null;
	that.Tile.prototype.capa2 = null;
	that.Tile.prototype.capa3 = null;
	that.Tile.prototype.capa4 = null;

	that.Tile.prototype.char = null;


	var cacheTileSize = 16;
	var TileSize = 32;
	var cacheSize = cacheTileSize * TileSize;
	
	var mapSize = 250;

	var cacheando = false;
	var cacheMax = 1;
	var cacheValue = 0;

	var areasCache = null

	var Tileset = {};

	var mapData = [];

	function armarCapas(w, h){
		for(var x = 0; x< w; x++){
			mapData[x] = new Array(h);
			for(var y = 0; y< h; y++){
				mapData[x][y] = new that.Tile;
			}
		}
	}
	
	var boundingBox = Camera.boundingBox;

	var tilesetsPedidas = 0;
	var tilesetsCargadas = 0;

	var recachearmapa = mz.delayer(function(cb){
		if(tilesetsPedidas == tilesetsCargadas){
			cachearMapa(cb);
		}
	}, 500);

	var tilesetLoaded = function(){
		tilesetsCargadas++;

		console.log(tilesetsPedidas,tilesetsCargadas);

		recachearmapa();
	}

	var loadTileset = function(tileset, url){
		Tileset[tileset] = [];
		//Tileset[tileset].url = url;

		tilesetsPedidas++;

		//textures.once(url + '_loaded', tilesetLoaded);

		var ct = 0;
		for (var y = 0; y < 16; y++) {
			for (var x = 0; x < 32; x++) {
				Tileset[tileset].push(textures.Grh(url, TileSize, TileSize, x*TileSize, y*TileSize));
			};
		};

		textures.get(url).onLoaded(function(){
			tilesetsCargadas++;
			console.log(tilesetsPedidas,tilesetsCargadas);
			recachearmapa();
		})
	}

	var tamanioCache = 0;

	function cachearSeccion(Cx,Cy){
		var canvasCache = document.createElement('canvas'),
		ctCache = canvasCache.getContext('2d');

		canvasCache.width = cacheSize;
		canvasCache.height = cacheSize;

		engine.setContext(ctCache);

		var c = {
			minX : Cx * cacheTileSize,
			minY : Cy * cacheTileSize,
			maxX : min((Cx + 1) * cacheTileSize, mapSize),
			maxY : min((Cy + 1) * cacheTileSize, mapSize)
		}

		var tX = 0, tY = 0;

		for (var x = c.minX; x < c.maxX; x++) {
			for (var y = c.minY; y < c.maxY; y++) {
				mapData[x][y] && mapData[x][y].piso && mapData[x][y].piso(tX, tY);
				tY += TileSize;
			};
			tY = 0;
			tX += TileSize;
		};

		tX = 0;
		tY = 0;

		if(c.minX / cacheTileSize > 1){
			c.minX -= 1;
			tX -= TileSize;
		}
		if(c.minY / cacheTileSize > 1){
			c.minY -= 1;
			tY -= TileSize;
		}

		if(c.maxX < mapSize) c.maxX += 1;
		if(c.maxY < mapSize) c.maxY += 1;

		for (var y = c.minY; y < c.maxY; y++) {
			for (var x = c.minX; x < c.maxX; x++) {
				mapData[x][y] && mapData[x][y].capa1 && mapData[x][y].capa1(tX, tY);
				mapData[x][y] && mapData[x][y].capa2 && mapData[x][y].capa2.centrado(tX, tY);
				tY += TileSize;
			};
			tY = 0;
			tX += TileSize;
		};

		engine.setContext(null);

		return textures.GrhFromCache(canvasCache/*canvasCache.toDataURL("image/png")*/, cacheSize);
	}


	var cachearMapa = function(cb){
		tamanioCache = Math.ceil(mapSize / cacheTileSize);
		
		if(areasCache == null){
			areasCache = new Array(tamanioCache + 1);
			for (var y = 0; y <= tamanioCache; y++) {
				areasCache[y] = new Array(tamanioCache + 1);
			}
		}

		cacheMax = tamanioCache * tamanioCache, cacheValue = 0;

		cacheando = true;

		for (var Cy = 0; Cy < tamanioCache; Cy++) {
			for (var Cx = 0; Cx < tamanioCache; Cx++) {
				setTimeout(function(Cx,Cy, areasCache){ 
					areasCache[Cx][Cy] = cachearSeccion(Cx,Cy);
					cacheValue++;
					console.log('CargandoMapa: ' + cacheValue + '/' + cacheMax, Cx, Cy);
					cacheando = cacheValue != cacheMax;
					cacheando || cb && cb();
				}, 0, Cx,Cy, areasCache);
			};
		};
	}

var chars = null;

	return {
		tileSize: TileSize,
		mapSize: mapSize,
		init: function(){
			armarCapas(mapSize, mapSize);

			//this.loadMap();
		},
		render: function(elapsedTime){

			if(cacheando){
				engine.renderThisUI(function(ctx){
					var circ = Math.PI * 2;
					var quart = Math.PI / 2;

					ctx.strokeStyle = '#CC9933';
					ctx.lineCap = 'square';
					ctx.lineWidth = 10.0;

					ctx.beginPath();
				    ctx.arc(400, 300, 70, -quart, circ * (cacheValue / cacheMax) - quart, false);
				    ctx.stroke();
				})

				return;
			} 

			var minX = boundingBox.minX - cacheTileSize;
			var minY = boundingBox.minY - cacheTileSize;

			for (var x = 0; x < tamanioCache; x++) {
				for (var y = 0; y < tamanioCache; y++) {
					var tX = x * cacheTileSize;
					var tY = y * cacheTileSize;

					if(tX < boundingBox.minX || tX > boundingBox.maxX || tY < boundingBox.minY || tY > boundingBox.maxY) continue;

					areasCache[x][y] && areasCache[x][y](x * cacheSize, y *  cacheSize);
				};
			}

			for (var y = boundingBox.minY; y < boundingBox.maxY; y++) {
				for (var x = boundingBox.minX; x < boundingBox.maxX; x++) {
					mapData[x][y].capa3 && mapData[x][y].capa3.vertical(x * TileSize,y * TileSize);
				};
			}

			chars = chars || require('js/adz/game/char') && require('js/adz/game/char').chars;
			chars && chars.forEach(function(e){
				/*if(e === myChar){
					var camPos = Camera.pos;//Camera.getPos();
					e.render(elapsedTime, camPos.x, camPos.y);
				} else*/
					e.render(elapsedTime);
			})


		},
		loadMap: function(data, cb){
			cacheando = true;
			cacheMax = 1;
			cacheValue = 0;

			var listaGraficos = [
				'cdn/grh/tilesets/1.png'
			];

			textures.require(listaGraficos, function(){
				loadTileset(0, 'cdn/grh/tilesets/1.png');

				armarCapas(mapSize, mapSize);

				for (var x = 0; x < mapSize; x++) {
					for (var y = 0; y < mapSize; y++) {
						mapData[x][y].piso = Tileset[0][/*Math.random()*32|0*/x % 4 + (y % 4) * 32];
					}
				}
/*
				for(var i = 1; i < 100; i++){
					mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa1 =  Tileset[1][48 + (Math.random() * 16) | 0];
					mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa2 =  Tileset[1][15];
				}

				mapData[0][0].capa3 =  textures.Grh('cdn/grh/png/7001.png',256,256,0,0,1);

				for(var i = 1; i < 20; i++){
					mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa3 =  textures.Grh('cdn/grh/png/7001.png',256,256,0,0,1);
				}
				*/

				recachearmapa(cb);
			}, function progreso(total, cantidad){
				cacheMax = total;
				cacheValue = cantidad;
			})
		}
	}
})