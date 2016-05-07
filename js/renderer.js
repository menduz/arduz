define(["require", "exports", './renderer/texture-db', './renderer/grh', './input/key-states'], function (require, exports, texture_db_1, grh_1, key_states_1) {
    "use strict";
    var TileSize = 32;
    var VelCamara = 192 / 1000;
    var mapSize = 250;
    var cacheTileSize = 16;
    var cacheSize = cacheTileSize * TileSize;
    var globalContext = null;
    var grhCabezas = 'cdn/grh/2.png';
    var HeadFactory = (function () {
        var DB = {};
        return function (index) {
            return (DB[index] = DB[index] || [
                grh_1.Grh(grhCabezas, 16, 16, 0, index * 16),
                grh_1.Grh(grhCabezas, 16, 16, 16, index * 16),
                grh_1.Grh(grhCabezas, 16, 16, 48, index * 16),
                grh_1.Grh(grhCabezas, 16, 16, 32, index * 16)
            ]);
        };
    })();
    var chars = [];
    var BodyFactory = (function () {
        var DB = {};
        var AnchoCuerpos = 25;
        var AltoCuerpos = 45;
        var ArmarCuerpo = function (body, grh) {
            var arrays = [
                new Array(5),
                new Array(5),
                new Array(4),
                new Array(4)
            ];
            for (var h = 0; h < arrays.length; h++) {
                for (var i = 0; i < arrays[h].length; i++) {
                    arrays[h][i] = grh_1.Grh(grh, AnchoCuerpos, AltoCuerpos, i * AnchoCuerpos, h * AltoCuerpos);
                }
                ;
            }
            ;
            return [arrays[0], arrays[3], arrays[1], arrays[2]];
        };
        var IniciarCuerpo = function (body, grh) {
            return (DB[body] = DB[body] || ArmarCuerpo(body, grh));
        };
        return function (body, head, alto) {
            var _x = 0;
            var _y = 0;
            var AddX = 0, AddY = 0;
            var _heading = 0;
            var enMovimiento = false;
            return {
                body: IniciarCuerpo(body, 'cdn/grh/cuerpos/' + body + '.png'),
                head: HeadFactory(head),
                render: function (elapsedTime, x, y) {
                    if (arguments.length == 1) {
                        x = _x * TileSize - AddX;
                        y = _y * TileSize - AddY;
                    }
                    if (AddX > 0) {
                        AddX -= elapsedTime * VelCamara;
                        if (AddX <= 0) {
                            enMovimiento = false;
                        }
                    }
                    if (AddX < 0) {
                        AddX += elapsedTime * VelCamara;
                        if (AddX >= 0) {
                            enMovimiento = false;
                        }
                    }
                    if (AddY > 0) {
                        AddY -= elapsedTime * VelCamara;
                        if (AddY <= 0) {
                            enMovimiento = false;
                        }
                    }
                    if (AddY < 0) {
                        AddY += elapsedTime * VelCamara;
                        if (AddY >= 0) {
                            enMovimiento = false;
                        }
                    }
                    var tmpx = x - ((AnchoCuerpos / 2) | 0) + 16;
                    var tmpy = y - AltoCuerpos + 16;
                    this.body[_heading][!enMovimiento ? 0 : (((new Date).getTime() / 60) | 0) % this.body[_heading].length](tmpx, tmpy);
                    this.head[_heading](x + 8, tmpy - 8);
                },
                setPos: function (x, y) {
                    enMovimiento = false;
                    _x = x;
                    _y = y;
                    AddX = 0;
                    AddY = 0;
                },
                moveByHead: function (heading) {
                    switch (heading) {
                        case 0:
                            AddY = TileSize;
                            AddX = 0;
                            _y++;
                            break;
                        case 1:
                            AddX = TileSize;
                            AddY = 0;
                            _x++;
                            break;
                        case 2:
                            AddY = -TileSize;
                            AddX = 0;
                            _y--;
                            break;
                        case 3:
                            AddX = -TileSize;
                            AddY = 0;
                            _x--;
                            break;
                    }
                    _heading = heading;
                    enMovimiento = true;
                },
                frenar: function () {
                    enMovimiento = false;
                    AddX = 0;
                    AddY = 0;
                },
                enMovimiento: function () { return enMovimiento; },
                setHeading: function (heading) {
                    _heading = heading;
                }
            };
        };
    })();
    var myChar = BodyFactory(4, 0, 45);
    chars.push(myChar);
    /*
    
    var Char = function(index, cabeza, cuerpo){
        this.charIndex = index;
        this.cabeza = cabeza;
    
        this.grhCabeza = HeadFactory(cabeza);
    };
    
    */
    var GrhFromCache = function (URL) {
        var t = null;
        if (typeof URL == 'object') {
            t = URL;
        }
        else {
            t = new Image();
            t.src = URL;
        }
        var r = mz.copy(function (x, y) {
            globalContext.drawImage(t, 0, 0, cacheSize, cacheSize, x, y, cacheSize, cacheSize);
        }, {
            objeto: t
        });
        return r;
    };
    var CheckKeys = (function () {
        var Heading = null;
        var HeadingHist = [0, 1, 2, 3];
        var Teclas = ['40', '39', '38', '37'];
        var ultimoHeading = null;
        key_states_1.KeyStates.on('37', function (b) {
            ultimoHeading != Heading && (ultimoHeading = Heading);
            Heading = 3;
        });
        key_states_1.KeyStates.on('38', function (b) {
            ultimoHeading != Heading && (ultimoHeading = Heading);
            Heading = 2;
        });
        key_states_1.KeyStates.on('39', function (b) {
            ultimoHeading != Heading && (ultimoHeading = Heading);
            Heading = 1;
        });
        key_states_1.KeyStates.on('40', function (b) {
            ultimoHeading != Heading && (ultimoHeading = Heading);
            Heading = 0;
        });
        return function () {
            if (!Camera.isMoving()) {
                if (!key_states_1.KeyStates.check(Teclas[Heading])) {
                    if (key_states_1.KeyStates.check(Teclas[ultimoHeading])) {
                        var t = ultimoHeading;
                        ultimoHeading != Heading && (ultimoHeading = Heading);
                        Heading = t;
                    }
                    else if (key_states_1.KeyStates.check(Teclas[0])) {
                        ultimoHeading != Heading && (ultimoHeading = Heading);
                        Heading = 0;
                    }
                    else if (key_states_1.KeyStates.check(Teclas[1])) {
                        ultimoHeading != Heading && (ultimoHeading = Heading);
                        Heading = 1;
                    }
                    else if (key_states_1.KeyStates.check(Teclas[2])) {
                        ultimoHeading != Heading && (ultimoHeading = Heading);
                        Heading = 2;
                    }
                    else if (key_states_1.KeyStates.check(Teclas[3])) {
                        ultimoHeading != Heading && (ultimoHeading = Heading);
                        Heading = 3;
                    }
                    else {
                        Heading = null;
                    }
                }
                if (Heading != null) {
                    Camera.Mover(Heading);
                }
            }
        };
    })();
    var Camera = (function () {
        var x = 0, y = 0;
        var width = 0, height = 0, ctx = null;
        var _moviendo = false, AddX = 0, AddY = 0, _continuar = false;
        var UltimoHeading = -1;
        var boundingBox = {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0
        };
        var tCamPos = { x: 0, y: 0 };
        return {
            boundingBox: boundingBox,
            setData: function (context, w, h) {
                ctx = context;
                width = w;
                height = h;
            },
            setCamera: function (elapsedTime) {
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
                        CheckKeys();
                        if (!_moviendo) {
                            AddY = 0;
                            AddX = 0;
                        }
                    }
                }
                else
                    CheckKeys();
                boundingBox.minX = Math.max(Math.round(x - width / 16 - 2), 0);
                boundingBox.minY = Math.max(Math.round(y - height / 16 - 2), 0);
                boundingBox.maxX = Math.min(Math.round(x + width / 16 + 2), mapSize);
                boundingBox.maxY = Math.min(Math.round(y + height / 16 + 2), mapSize);
                tCamPos.x = (x * TileSize - AddX) | 0;
                tCamPos.y = (y * TileSize - AddY) | 0;
                ctx.translate(-tCamPos.x - 16 + (width / 2) | 0, -tCamPos.y - 16 + height / 2);
            },
            unstranslate: function () {
                ctx.translate(tCamPos.x + 16 - (width / 2) | 0, tCamPos.y + 16 - height / 2);
            },
            Mover: function (heading) {
                if (!_moviendo) {
                    switch (heading) {
                        case 0:
                            AddY += TileSize;
                            AddX = 0;
                            y++;
                            break;
                        case 1:
                            AddX += TileSize;
                            AddY = 0;
                            x++;
                            break;
                        case 2:
                            AddY -= TileSize;
                            AddX = 0;
                            y--;
                            break;
                        case 3:
                            AddX -= TileSize;
                            AddY = 0;
                            x--;
                            break;
                    }
                    myChar.moveByHead(heading);
                }
                _moviendo = true;
            },
            setPos: function (_x, _y) {
                x = _x | 0;
                y = _y | 0;
                AddY = AddX = 0;
                _moviendo = false;
                tCamPos.x = (x * TileSize - AddX) | 0;
                tCamPos.y = (y * TileSize - AddY) | 0;
            },
            isMoving: function () { return _moviendo; },
            getPos: function () {
                return {
                    x: tCamPos.x,
                    y: tCamPos.y //(y * TileSize - AddY) | 0
                };
            },
            pos: tCamPos
        };
    })();
    ;
    var Map = (function () {
        var ctx = null;
        var cacheando = false;
        var cacheMax = 1;
        var cacheValue = 0;
        var areasCache = null;
        var Tileset = {};
        var mapData = [];
        var boundingBox = Camera.boundingBox;
        var tilesetsPedidas = 0;
        var tilesetsCargadas = 0;
        var tilesetLoaded = function () {
            tilesetsCargadas++;
            console.log(tilesetsPedidas, tilesetsCargadas);
            if (tilesetsPedidas == tilesetsCargadas) {
                cachearMapa();
            }
        };
        var loadTileset = function (tileset, url) {
            Tileset[tileset] = [];
            //Tileset[tileset].url = url;
            tilesetsPedidas++;
            texture_db_1.TextureDB.once(url + '_loaded', tilesetLoaded);
            var ct = 0;
            for (var y = 0; y < 16; y++) {
                for (var x = 0; x < 32; x++) {
                    Tileset[tileset].push(grh_1.Grh(url, TileSize, TileSize, x * TileSize, y * TileSize));
                }
                ;
            }
            ;
        };
        var tamanioCache = 0;
        function cachearSeccion(Cx, Cy) {
            var canvasCache = document.createElement('canvas'), ctCache = canvasCache.getContext('2d');
            canvasCache.width = cacheSize;
            canvasCache.height = cacheSize;
            var bkGC = globalContext;
            globalContext = ctCache;
            var c = {
                minX: Cx * cacheTileSize,
                minY: Cy * cacheTileSize,
                maxX: Math.min((Cx + 1) * cacheTileSize, mapSize),
                maxY: Math.min((Cy + 1) * cacheTileSize, mapSize)
            };
            var tX = 0, tY = 0;
            for (var x = c.minX; x < c.maxX; x++) {
                for (var y = c.minY; y < c.maxY; y++) {
                    mapData[x][y] && mapData[x][y](tX, tY);
                    tY += TileSize;
                }
                ;
                tY = 0;
                tX += TileSize;
            }
            ;
            globalContext = bkGC;
            return GrhFromCache(canvasCache /*canvasCache.toDataURL("image/png")*/);
        }
        var cachearMapa = function () {
            tamanioCache = Math.ceil(mapSize / cacheTileSize);
            if (areasCache == null) {
                areasCache = new Array(tamanioCache + 1);
                for (var y = 0; y <= tamanioCache; y++) {
                    areasCache[y] = new Array(tamanioCache + 1);
                }
            }
            cacheMax = tamanioCache * tamanioCache, cacheValue = 0;
            cacheando = true;
            for (var Cy = 0; Cy < tamanioCache; Cy++) {
                for (var Cx = 0; Cx < tamanioCache; Cx++) {
                    setTimeout(function (Cx, Cy, areasCache) {
                        areasCache[Cx][Cy] = cachearSeccion(Cx, Cy);
                        cacheValue++;
                        console.log('CargandoMapa: ' + cacheValue + '/' + cacheMax, Cx, Cy);
                        cacheando = cacheValue != cacheMax;
                    }, 0, Cx, Cy, areasCache);
                }
                ;
            }
            ;
        };
        return {
            init: function (context) {
                ctx = context;
                loadTileset(0, 'cdn/grh/1.png');
                //setTimeout(function(){cachearMapa();}, 3000)
            },
            render: function (elapsedTime) {
                if (cacheando) {
                    UI.renderThis(function (ctx) {
                        var circ = Math.PI * 2;
                        var quart = Math.PI / 2;
                        ctx.strokeStyle = '#CC9933';
                        ctx.lineCap = 'square';
                        ctx.lineWidth = 10.0;
                        ctx.beginPath();
                        ctx.arc(400, 300, 70, -quart, circ * (cacheValue / cacheMax) - quart, false);
                        ctx.stroke();
                    });
                    return;
                }
                ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                /*for (var x = boundingBox.minX; x < boundingBox.maxX; x++) {
                    for (var y = boundingBox.minY; y < boundingBox.maxY; y++) {
                        //ctx.fillRect(x * TileSize, y * TileSize, TileSize - 1, TileSize - 1);
                        //mapData[x][y] && mapData[x][y](x * TileSize, y * TileSize);
                    };
                };*/
                var minX = boundingBox.minX - cacheTileSize;
                var minY = boundingBox.minY - cacheTileSize;
                for (var x = 0; x < tamanioCache; x++) {
                    for (var y = 0; y < tamanioCache; y++) {
                        var tX = x * cacheTileSize;
                        var tY = y * cacheTileSize;
                        if (tX < boundingBox.minX || tX > boundingBox.maxX || tY < boundingBox.minY || tY > boundingBox.maxY)
                            continue;
                        //ctx.fillRect(x * TileSize * 16, y * TileSize * 16, TileSize * 16 - 1, TileSize * 16 - 1);
                        areasCache[x][y] && areasCache[x][y](x * cacheSize, y * cacheSize);
                    }
                    ;
                }
                chars.forEach(function (e) {
                    if (e === myChar) {
                        var camPos = Camera.pos; //Camera.getPos();
                        e.render(elapsedTime, camPos.x, camPos.y);
                    }
                    else
                        e.render(elapsedTime);
                });
            },
            loadMap: function (data) {
                for (var x = 0; x < mapSize; x++) {
                    mapData[x] = new Array(mapSize);
                    for (var y = 0; y < mapSize; y++) {
                        mapData[x][y] = Tileset[0][x % 4 + (y % 4) * 32];
                    }
                }
            }
        };
    })();
    var MZEngine = Arduz.renderer = (function () {
        var timer = mz.now;
        var ctx = null;
        var canvas = null;
        var lastTime = null, frameCount = 0, realFPS = 0, elapsedTime = 1;
        var width = 0;
        var height = 0;
        var size = {
            width: width,
            height: height
        };
        var lastRender = null;
        var setSize = function (w, h) {
            width = w;
            height = h;
            size.width = w;
            size.height = h;
            canvas.width = w;
            canvas.height = h;
            Camera.setData(ctx, width, height);
        };
        function render() {
            requestAnimationFrame(render);
            clearScreen();
            var nowTime = timer();
            elapsedTime = nowTime - lastRender;
            lastRender = nowTime;
            var diffTime = nowTime - lastTime;
            if (diffTime >= 1000) {
                realFPS = frameCount;
                frameCount = 0;
                lastTime = nowTime;
            }
            frameCount++;
            ctx.save();
            ctx.transformado = true;
            Camera.setCamera(elapsedTime);
            Map.render(elapsedTime);
            ctx.restore();
            ctx.transformado = false;
            UI.render();
            drawFPS(elapsedTime);
        }
        function clearScreen() {
            ctx.clearRect(0, 0, width, height);
        }
        function drawText(text, x, y, centered, color) {
            if (text && x && y) {
                ctx.save();
                if (centered) {
                    ctx.textAlign = "center";
                }
                ctx.fillStyle = color || "white";
                ctx.fillText(text, x, y);
                ctx.restore();
            }
        }
        function drawTextStroked(text, x, y, centered, color, strokeColor) {
            if (text && x && y) {
                ctx.save();
                if (centered) {
                    ctx.textAlign = "center";
                }
                ctx.strokeStyle = strokeColor || "#373737";
                ctx.lineWidth = 1;
                ctx.strokeText(text, x, y);
                ctx.fillStyle = color || "white";
                ctx.fillText(text, x, y);
                ctx.restore();
            }
        }
        function drawFPS(elapsedTime) {
            drawText("FPS: " + realFPS + " - " + Math.round(1000 / elapsedTime), 40, 30, false);
        }
        return {
            init: function () {
                canvas = document.getElementById('juego');
                globalContext = ctx = canvas.getContext('2d');
                setSize(800, 600);
                Map.init(ctx);
                Map.loadMap();
                lastTime = timer();
                lastRender = lastTime;
                render();
            },
            getContext: function () { return ctx; },
            getSize: function () {
                return size;
            }
        };
    })();
    var UI = (function () {
        var size = MZEngine.getSize();
        var hotBar = grh_1.Grh('cdn/ui/hotbar.png', 400, 64, 0, 0);
        var barras = grh_1.Grh('cdn/ui/barras.png', 200, 64, 0, 0);
        var frameInterno = grh_1.Grh('cdn/ui/frameinterno.png', 800, 600, 0, 0);
        return {
            render: function () {
                frameInterno(0, 0);
                hotBar(size.width / 2 - 200, size.height - 64);
                barras(size.width - 200, size.height - 64);
                globalContext.drawImage(texture_db_1.TextureDB.get('cdn/adz.png'), -100, -100, 640, 480);
            },
            renderThis: function (fn) {
                globalContext.save();
                if (globalContext.transformado) {
                    Camera.unstranslate();
                }
                try {
                    fn(globalContext);
                }
                catch (e) {
                    console.error(e);
                }
                globalContext.restore();
            }
        };
    })();
    var populate = (function () {
        var myChara = BodyFactory(4, 0, 45);
        chars.push(myChara);
        setInterval(function () { myChara.moveByHead(((Math.random() * 700) % 4) | 0); }, 192);
    });
});
