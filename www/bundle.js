/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine = __webpack_require__(1);
	var lg = __webpack_require__(3);
	var dom_chat_1 = __webpack_require__(5);
	var input_1 = __webpack_require__(6);
	function RequireList() {
	    var rlcount = 0;
	    var pending = 0;
	    var onEnd = null;
	    var terminado = false;
	    var ret = mz.copy(function (cb) {
	        rlcount++;
	        pending++;
	        var done = false;
	        terminado = false;
	        return function () {
	            cb && cb.apply(null, arguments);
	            if (done == false) {
	                pending--;
	                if (pending == 0) {
	                    terminado = true;
	                    onEnd && onEnd();
	                }
	            }
	        };
	    }, {
	        onEnd: function (onend) {
	            onEnd = onend;
	            if (terminado) {
	                onEnd && onEnd();
	            }
	        }
	    });
	    return ret;
	}
	var requireList = RequireList;
	$(function () {
	    engine.init(document.getElementById('juego'));
	    input_1.KeyStates.appendTo(document);
	    dom_chat_1.chatPromptInstance.appendTo(document.getElementById('juego').parentElement);
	    lg.show();
	    var requireListGameEngine = requireList();
	    var cbGraficos = requireListGameEngine(function () {
	        console.info('Graficos cargados!');
	    });
	    var cbCuerpos = requireListGameEngine(function () {
	        console.info('Cuerpos cargados!');
	    });
	    var cbCabezas = requireListGameEngine(function () {
	        console.info('Cabezas cargados!');
	    });
	    var cbCascos = requireListGameEngine(function () {
	        console.info('Cascos cargados!');
	    });
	    __webpack_require__(7).cargarGraficosRaw('cdn/indexes/graficos.txt', cbGraficos);
	    __webpack_require__(8).loadRaw('cdn/indexes/cuerpos.txt', cbCuerpos);
	    var heads = __webpack_require__(9);
	    heads.loadHeadsRaw('cdn/indexes/cabezas.txt', cbCabezas);
	    heads.loadHelmetsRaw('cdn/indexes/cascos.txt', cbCascos);
	    requireListGameEngine.onEnd(function () {
	        console.log('-------------- Indices cargados --------------');
	        __webpack_require__(10);
	        console.log('Cargado el input');
	        __webpack_require__(22);
	        console.log('Cargado el hud');
	        var Camera = __webpack_require__(11);
	        engine.cameraInitialized(Camera);
	        var char = __webpack_require__(20);
	        Camera.observable.on('moveByHead', function (heading, x, y) {
	            char.mainChar && char.mainChar.moveByHead(heading);
	        });
	        var map = __webpack_require__(19);
	        engine.mapInitialized(map);
	        __webpack_require__(23).connect("mz");
	        setInterval(function () { return __webpack_require__(23).connect("mz"); }, 3000);
	        /*
	        map.loadMap(null, function () {
	
	            var myChara = char.BodyFactory(1, 5, 45);
	            char.chars.push(myChara);
	
	            setInterval(function () {
	                myChara.moveByHead(((Math.random() * 700) % 4) | 0)
	            }, 192)
	
	            var mainChar = char.BodyFactory(1, 4, 45);
	
	            mainChar.body.name = "menduz"
	
	            char.chars.push(mainChar);
	
	            char.mainChar = mainChar;
	
	            lg.hide()
	
	
	        });
	        */
	    });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var win = __webpack_require__(2);
	var elapsedTime = 0;
	var map = null, cam = null;
	var timer = mz.now;
	var ctx = null, octx = null;
	var canvas = null;
	var lastTime = null, frameCount = 0, realFPS = 0;
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
	};
	function render() {
	    requestAnimationFrame(render);
	    clearScreen();
	    var nowTime = exports.tick = timer();
	    elapsedTime = nowTime - lastRender;
	    lastRender = nowTime;
	    var diffTime = nowTime - lastTime;
	    if (diffTime >= 1000) {
	        realFPS = frameCount;
	        frameCount = 0;
	        lastTime = nowTime;
	    }
	    frameCount++;
	    if (cam) {
	        ctx.save();
	        ctx.transformado = true;
	        cam.update(elapsedTime);
	        map && map.render(elapsedTime);
	        ctx.restore();
	        ctx.transformado = false;
	        win && win.render();
	        exports.renderHud && exports.renderHud();
	    }
	    drawFPS(elapsedTime);
	}
	function clearScreen() {
	    ctx.clearRect(0, 0, width, height);
	}
	function drawText(text, x, y, centered, color) {
	    if (text && x != void 0 && y != void 0) {
	        ctx.save();
	        if (centered) {
	            ctx.textAlign = "center";
	        }
	        ctx.fillStyle = color || "white";
	        ctx.fillText(text, x | 0, y | 0);
	        ctx.restore();
	    }
	}
	exports.drawText = drawText;
	function renderTextCentered(text, x, y, color) {
	    drawText(text, x, y, true, color);
	}
	exports.renderTextCentered = renderTextCentered;
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
	exports.drawTextStroked = drawTextStroked;
	function drawFPS(elapsedTime) {
	    drawText("FPS: " + realFPS, 753, 20, false);
	}
	exports.tick = 0;
	exports.init = function (_canvas, w, h) {
	    canvas = _canvas;
	    octx = ctx = canvas.getContext('2d');
	    this.drawImage = function () { ctx.drawImage.apply(ctx, arguments); };
	    setSize(w || 800, h || 600);
	    lastTime = timer();
	    lastRender = lastTime;
	    render();
	};
	exports.getSize = function () {
	    return size;
	};
	exports.drawImage = function () { };
	exports.renderThisUI = function (fn) {
	    ctx.save();
	    if (ctx.transformado) {
	        cam && cam.unstranslate();
	    }
	    try {
	        fn(ctx);
	    }
	    catch (e) {
	        console.error(e);
	    }
	    ctx.restore();
	};
	exports.setContext = function (c) {
	    ctx = c || octx;
	};
	exports.translate = function (x, y) {
	    ctx && ctx.translate(x, y);
	};
	exports.renderHud = null;
	function cameraInitialized(_) {
	    cam = _;
	}
	exports.cameraInitialized = cameraInitialized;
	function mapInitialized(_) {
	    map = _;
	    map.init();
	}
	exports.mapInitialized = mapInitialized;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var engine = __webpack_require__(1);
	var textures = __webpack_require__(4);
	var win = __webpack_require__(2);
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
	module.exports = new LoadingWindow;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mzengine = __webpack_require__(1);
	var DB = {};
	var that = mz.copy(new mz.EventDispatcher(), {
	    Textura: function (url, callback) {
	        var image = new Image();
	        image._loaded = { loaded: false };
	        image.queueOnLoaded = [];
	        image.addEventListener("load", function () {
	            image._loaded.loaded = true;
	            that.trigger(url + '_loaded', image);
	            for (var i in image.queueOnLoaded)
	                image.queueOnLoaded[i](image, url);
	            image.queueOnLoaded = [];
	        }, false);
	        image.src = url;
	        image.onLoaded = function (cb) {
	            if (image._loaded.loaded)
	                cb(image, url);
	            else
	                image.queueOnLoaded.push(cb);
	        };
	        return image;
	    },
	    get: function (url) {
	        return url in DB ? DB[url] : (DB[url] = that.Textura(url));
	    },
	    require: function (list, cb, onProgress) {
	        var esperar = false;
	        var ct = list.length;
	        list.forEach(function (e) {
	            that.get(e).onLoaded(function (img, url) {
	                ct--;
	                onProgress && onProgress(list.length + 1, list.length - ct);
	                if (ct == 0)
	                    cb && cb();
	            });
	        });
	    },
	    Grh: function (tex, w, h, srcX, srcY) {
	        var t = that.get(tex);
	        var r = mz.copy(function (x, y) {
	            mzengine.drawImage(t, srcX, srcY, w, h, x, y, w, h);
	        }, {
	            halfCenterX: (w / 2 - 16) | 0,
	            halfCenterY: (h / 2 - 16) | 0,
	            halfCenterYv: (h - 16) | 0,
	            centrado: function (x, y) {
	                mzengine.drawImage(t, srcX, srcY, w, h, x - r.halfCenterX, y - r.halfCenterY, w, h);
	            },
	            vertical: function (x, y) {
	                mzengine.drawImage(t, srcX, srcY, w, h, x - r.halfCenterX, y - r.halfCenterYv, w, h);
	            },
	            width: w,
	            height: h,
	            texture: t,
	            get loaded() {
	                return t._loaded.loaded;
	            }
	        });
	        return r;
	    },
	    GrhFromCache: function (URL, cacheSize) {
	        var t = null;
	        if (typeof URL == 'object') {
	            t = URL;
	        }
	        else {
	            t = new Image();
	            t.src = URL;
	        }
	        var r = mz.copy(function (x, y) {
	            mzengine.drawImage(t, 0, 0, cacheSize, cacheSize, x, y, cacheSize, cacheSize);
	        }, {
	            objeto: t
	        });
	        return r;
	    }
	});
	module.exports = that;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MAX_MESSAGE_COUNT = 6;
	var ChatPrompt = (function (_super) {
	    __extends(ChatPrompt, _super);
	    function ChatPrompt() {
	        var _this = this;
	        _super.call(this);
	        this.show = mz.delayer(function () {
	            if (!_this.chatVisible) {
	                _this.chatVisible = true;
	                _this.input.value = '';
	                _this.input.focus();
	            }
	        }, 100);
	        this.messages = new mz.Collection;
	        this.input = this.find('input')[0];
	        setInterval(function () { return _this.messages.length && _this.messages.removeAt(0); }, 30000);
	        this.chatVisible = false;
	    }
	    ChatPrompt.prototype.hookKeys = function (e) {
	        if (e.event.which == 13 && this.chatVisible) {
	            this.show.cancel();
	        }
	    };
	    ChatPrompt.prototype.keyPressed = function (e) {
	        if (e.event.which == 13) {
	            if ($(this.input).val().length) {
	                this.emit('chat', $(this.input).val());
	            }
	            this.chatVisible = false;
	            this.show.cancel();
	        }
	    };
	    ChatPrompt.prototype.pushMessage = function (message) {
	        this.messages.push(message);
	        while (this.messages.length > MAX_MESSAGE_COUNT) {
	            this.messages.removeAt(0);
	        }
	    };
	    __decorate([
	        ChatPrompt.proxy, 
	        __metadata('design:type', Boolean)
	    ], ChatPrompt.prototype, "chatVisible", void 0);
	    __decorate([
	        ChatPrompt.proxy, 
	        __metadata('design:type', mz.Collection)
	    ], ChatPrompt.prototype, "messages", void 0);
	    ChatPrompt = __decorate([
	        ChatPrompt.Template("\n    <div style=\"position: absolute; top:0; left: 0; width: 800px\">\n        <mz-repeat list=\"{this.messages}\" tag=\"div\" style=\"\n            opacity: 0.5; \n            font-size: 0.8em; \n            padding: 20px; \n            pointer-events: none; \n            user-select: none;\n            -webkit-user-select: none;\n        \">\n            <div style=\"\n                max-width: 760px;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                word-break: break-all;\n                max-height: 2.4em;\n                color: {scope.color || 'white'}\n            \"><b>{scope.nick}</b> {scope.text}</div>\n        </mz-repeat>\n        \n        <input visible=\"{this.chatVisible}\" name=\"chatInput\" onkeyup=\"{this.keyPressed}\" onkeydown=\"{this.hookKeys}\" placeholder=\"Chat\" style=\"\n            position: absolute;\n            background: rgba(100,100,100,0.5);\n            color: white;\n            top: 3px;\n            left: 3px;\n            width: 794px;\n            border: 0;\n            border-bottom: 1px solid rgba(50,50,50,0.8);\n            padding: 7px 11px;\n            outline: none;\n            box-shadow: 0px 0px 4px 1px black inset;\n        \"/>\n    </div>\n"),
	        ChatPrompt.ConfigureUnwrapped, 
	        __metadata('design:paramtypes', [])
	    ], ChatPrompt);
	    return ChatPrompt;
	}(mz.widgets.BasePagelet));
	exports.ChatPrompt = ChatPrompt;
	exports.chatPromptInstance = new ChatPrompt;


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine = __webpack_require__(1);
	var textures = __webpack_require__(4);
	var indexaciones = {};
	var realizados = {};
	this.loaded = false;
	exports.Grafico = function Grafico(base) {
	    this.frames = [];
	    if (base.l && base.l.length > 0) {
	        for (var i in base.l) {
	            this.frames.push(obtenerGrafico(base.l[i]));
	        }
	    }
	    else if (base.i) {
	        this.frames.push(obtenerGrafico(base.i));
	    }
	    this.width = this.frames[0].width;
	    this.height = this.frames[0].height;
	    this.centerX = (this.width / 2 - 16) | 0;
	    this.centerY = (this.height / 2 - 16) | 0;
	    this.framesCount = this.frames.length;
	    this.time = base.t;
	};
	exports.Grafico.prototype.frames = null;
	exports.Grafico.prototype.framesCount = null;
	exports.Grafico.prototype.time = null;
	exports.Grafico.prototype.startTime = null;
	exports.Grafico.prototype.width = 0;
	exports.Grafico.prototype.height = 0;
	exports.Grafico.prototype.centerX = 0;
	exports.Grafico.prototype.centerY = 0;
	exports.Grafico.prototype.quiet = function (x, y) {
	    // Renders the first frame of the graphic
	    this.framesCount && this.frames[0](x, y);
	};
	exports.Grafico.prototype.animated = function (x, y) {
	    // Renders the graphic animated if it has more tha one frame.
	    if (this.framesCount == 1)
	        return this.quiet(x, y);
	    return this.frames[(((engine.tick % (this.time || 200)) / (this.time || 200)) * this.framesCount | 0)](x, y);
	};
	exports.Grafico.prototype.quietVertical = function (x, y) {
	    // Renders the first frame of the graphic
	    this.framesCount && this.frames[0].vertical(x, y);
	};
	exports.Grafico.prototype.animatedVertical = function (x, y) {
	    // Renders the graphic animated if it has more tha one frame.
	    if (this.framesCount == 1)
	        return this.quietVertical(x, y);
	    var frame = Math.round(((engine.tick % (this.time || 200)) / (this.time || 200)) * this.framesCount) % this.framesCount;
	    return this.frames[frame] && this.frames[frame].vertical(x, y);
	};
	exports.Grafico.prototype.quietCentered = function (x, y) {
	    // Renders the first frame of the graphic
	    this.framesCount && this.frames[0].centrado(x, y);
	};
	exports.Grafico.prototype.animatedCentered = function (x, y) {
	    // Renders the graphic animated if it has more tha one frame.
	    if (this.framesCount == 1)
	        return this.quietCentered(x, y);
	    var frame = Math.round(((engine.tick % (this.time || 200)) / (this.time || 200)) * this.framesCount) % this.framesCount;
	    return this.frames[frame] && this.frames[frame].centrado(x, y);
	};
	function obtenerGrafico(index) {
	    if (index in indexaciones) {
	        var g = indexaciones[index];
	        if (g.g) {
	            return textures.Grh('cdn/grh/png/' + g.g + '.png', g.w, g.h, g.x, g.y);
	        }
	        else if (g.l) {
	            throw "No se puede usar una animacion como frame de una animacion. frame=" + index;
	        }
	    }
	    else
	        console.error("Grafico no indexado: " + index);
	}
	exports.get = function (index) {
	    if (!(index in indexaciones))
	        throw "Grafico " + index + " no indexado";
	    return realizados[index] || (realizados[index] = new exports.Grafico(indexaciones[index]));
	};
	exports.indexarFrame = function (index, grafico, srcX, srcY, w, h) {
	    indexaciones[index] = {
	        g: grafico,
	        l: null,
	        t: null,
	        x: parseInt(srcX),
	        y: parseInt(srcY),
	        w: parseInt(w),
	        h: parseInt(h),
	        i: index
	    };
	};
	exports.indexarAnimacion = function (index, frames, tiempo) {
	    indexaciones[index] = {
	        g: null,
	        l: frames,
	        t: parseInt(tiempo || 200),
	        x: null,
	        y: null,
	        w: null,
	        h: null,
	        i: index
	    };
	};
	exports.loaded = null;
	exports.cargarGraficosRaw = function (url, cb) {
	    var grhHeader = /^Grh(\d+)=1-(\d+)-(\d+)-(\d+)-(\d+)-(\d+)/;
	    var animHeader = /^Grh(\d+)=(\d+)-(.*)-(.+)$/;
	    exports.loaded = false;
	    $.ajax({
	        url: url || 'cdn/indexes/graficos.txt',
	        method: 'GET',
	        success: function (e) {
	            var datos = e.split(/(\n)/g);
	            for (var i in datos) {
	                var t = null, d = mz.trim(datos[i]);
	                if (d && d.length) {
	                    if (t = grhHeader.exec(d)) {
	                        exports.indexarFrame(t[1], t[2], t[3], t[4], t[5], t[6]);
	                    }
	                    else {
	                        if (t = animHeader.exec(d)) {
	                            exports.indexarAnimacion(t[1], t[3].split(/-/g), parseInt(t[4]));
	                        }
	                    }
	                }
	            }
	            exports.loaded = true;
	            cb && cb();
	        }
	    });
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var grh = __webpack_require__(7);
	var heads = __webpack_require__(9);
	var engine = __webpack_require__(1);
	var OFFSET_HEAD = -34;
	var cuerpos = {};
	exports.Body = function Body() {
	};
	exports.Body.prototype.rightHand = null;
	exports.Body.prototype.leftHand = null;
	exports.Body.prototype.head = null;
	exports.Body.prototype.helmet = null;
	exports.Body.prototype.aura = null;
	exports.Body.prototype.heading = 1;
	exports.Body.prototype.grhs = null;
	exports.Body.prototype.name = null;
	exports.Body.prototype.headOffsetX = 0;
	exports.Body.prototype.headOffsetY = 0;
	exports.Body.prototype.setHead = function (headIndex) {
	    this.head = heads.get(headIndex);
	};
	exports.Body.prototype.setHelmet = function (headIndex) {
	    this.helmet = heads.getHelmet(headIndex);
	};
	exports.Body.prototype.setBody = function (bodyIndex) {
	    this.grhs = null;
	    this.headOffsetX = 0;
	    this.headOffsetY = 0;
	    if (bodyIndex in cuerpos) {
	        this.headOffsetX = cuerpos[bodyIndex].hX;
	        this.headOffsetY = cuerpos[bodyIndex].hY;
	        this.grhs = {
	            0: grh.get(cuerpos[bodyIndex].g[1]),
	            1: grh.get(cuerpos[bodyIndex].g[2]),
	            2: grh.get(cuerpos[bodyIndex].g[3]),
	            3: grh.get(cuerpos[bodyIndex].g[4])
	        };
	    }
	};
	exports.Body.prototype.render = function (x, y, heading, anim, animEscudo) {
	    this.heading = heading | 0;
	    this.aura && this.aura.centered(x, y);
	    this.grhs && this.grhs[this.heading] && this.grhs[this.heading][anim ? 'animatedVertical' : 'quietVertical'](x, y);
	    this.head && this.head && this.head.render(x + this.headOffsetX, y + this.headOffsetY + OFFSET_HEAD, this.heading);
	    this.helmet && this.helmet && this.helmet.render(x + this.headOffsetX, y + OFFSET_HEAD + this.headOffsetY, this.heading);
	    this.rightHand && this.rightHand[this.heading] && this.rightHand[this.heading][animEscudo ? 'animatedVertical' : 'quietVertical'](x, y);
	    this.leftHand && this.leftHand[this.heading] && this.leftHand[this.heading][animEscudo ? 'animatedVertical' : 'quietVertical'](x, y);
	    this.name && engine.renderTextCentered(this.name, x + 16, y + 24);
	};
	exports.loadRaw = function (url, cb) {
	    var bodyHeader = /\[BODY(\d+)\]/;
	    var grhHeader = /WALK(1|2|3|4)=(\d+)/;
	    var headOffsetHeaderX = /HeadOffsetX=(.+)/;
	    var headOffsetHeaderY = /HeadOffsetY=(.+)/;
	    this.loaded = false;
	    $.ajax({
	        url: url || 'cdn/indexes/cuerpos.txt',
	        method: 'GET',
	        success: function (e) {
	            var datos = e.split(/(\n)/g);
	            var cuerpoActual = null;
	            for (var i in datos) {
	                var t = void 0;
	                if (t = bodyHeader.exec(datos[i])) {
	                    cuerpoActual = {
	                        g: { 1: 0, 2: 0, 3: 0, 4: 0 },
	                        hX: 0,
	                        hY: 0,
	                        i: t[1]
	                    };
	                    cuerpos[t[1]] = cuerpoActual;
	                }
	                else if (t = grhHeader.exec(datos[i])) {
	                    cuerpoActual && (cuerpoActual.g[t[1]] = parseInt(t[2]));
	                }
	                else if (t = headOffsetHeaderX.exec(datos[i])) {
	                    cuerpoActual && (cuerpoActual.hX = parseInt(t[1]));
	                }
	                else if (t = headOffsetHeaderY.exec(datos[i])) {
	                    cuerpoActual && (cuerpoActual.hY = parseInt(t[1]));
	                }
	            }
	            //console.log(cuerpos)
	            exports.loaded = true;
	            cb && cb();
	        }
	    });
	};
	exports.loaded = false;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var grh = __webpack_require__(7);
	var DB = {};
	var DBHelmets = {};
	var heads = {};
	var helmets = {};
	exports.Head = function Head(head) {
	    this.grh = {
	        0: grh.get(head.g[1]),
	        1: grh.get(head.g[2]),
	        2: grh.get(head.g[3]),
	        3: grh.get(head.g[4])
	    };
	};
	exports.Head.prototype.grh = null;
	exports.Head.prototype.render = function (x, y, heading) {
	    this.grh && this.grh[heading] && this.grh[heading].quiet(x - this.grh[heading].centerX, y);
	};
	exports.Head.prototype.renderBottomAligned = function (x, y, heading) {
	    this.grh && this.grh[heading] && this.grh[heading].quiet(x - this.grh[heading].centerX, y - this.grh[heading].height);
	};
	exports.get = function (index) {
	    return heads[index] && (DB[index] = DB[index] || new exports.Head(heads[index])) || null;
	};
	exports.getHelmet = function (index) {
	    return helmets[index] && (DBHelmets[index] = DBHelmets[index] || new exports.Head(helmets[index])) || null;
	};
	function parseInto(obj, e) {
	    var headHeader = /\[HEAD(\d+)\]/;
	    var grhHeader = /Head(1|2|3|4)=(\d+)/;
	    var data = e.split(/(\n)/g);
	    var actualHead = null;
	    for (var i in data) {
	        var d = mz.trim(data[i]);
	        var t = void 0;
	        if (t = headHeader.exec(d)) {
	            actualHead = {
	                g: { 1: 0, 2: 0, 3: 0, 4: 0 },
	                i: t[1]
	            };
	            obj[t[1]] = actualHead;
	        }
	        else if (t = grhHeader.exec(d)) {
	            actualHead && (actualHead.g[t[1]] = parseInt(t[2]));
	        }
	    }
	}
	exports.loadHeadsRaw = function (url, cb) {
	    $.ajax({
	        url: url || 'cdn/indexes/cabezas.txt',
	        method: 'GET',
	        success: function (e) {
	            parseInto(heads, e);
	            cb && cb();
	        }
	    });
	};
	exports.loadHelmetsRaw = function (url, cb) {
	    $.ajax({
	        url: url || 'cdn/indexes/cascos.txt',
	        method: 'GET',
	        success: function (e) {
	            parseInto(helmets, e);
	            cb && cb();
	        }
	    });
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var input_1 = __webpack_require__(6);
	var Camera = __webpack_require__(11);
	var common = __webpack_require__(12);
	var dom_chat_1 = __webpack_require__(5);
	var Heading = null;
	var HeadingHist = [0, 1, 2, 3];
	var Teclas = ['40', '39', '38', '37'];
	var ultimoHeading = null;
	input_1.KeyStates.on('37', function (b) {
	    ultimoHeading != Heading && (ultimoHeading = Heading);
	    Heading = common.Enums.Heading.West;
	});
	input_1.KeyStates.on('38', function (b) {
	    ultimoHeading != Heading && (ultimoHeading = Heading);
	    Heading = common.Enums.Heading.North;
	});
	input_1.KeyStates.on('39', function (b) {
	    ultimoHeading != Heading && (ultimoHeading = Heading);
	    Heading = common.Enums.Heading.East;
	});
	input_1.KeyStates.on('40', function (b) {
	    ultimoHeading != Heading && (ultimoHeading = Heading);
	    Heading = common.Enums.Heading.South;
	});
	input_1.KeyStates.on('key_down_13', function () { return dom_chat_1.chatPromptInstance.show(); });
	Camera.bindFn(function () {
	    if (!Camera.isMoving()) {
	        if (!input_1.KeyStates.check(Teclas[Heading])) {
	            if (input_1.KeyStates.check(Teclas[ultimoHeading])) {
	                var t = ultimoHeading;
	                ultimoHeading != Heading && (ultimoHeading = Heading);
	                Heading = t;
	            }
	            else if (input_1.KeyStates.check(Teclas[0])) {
	                ultimoHeading != Heading && (ultimoHeading = Heading);
	                Heading = common.Enums.Heading.South;
	            }
	            else if (input_1.KeyStates.check(Teclas[1])) {
	                ultimoHeading != Heading && (ultimoHeading = Heading);
	                Heading = common.Enums.Heading.East;
	            }
	            else if (input_1.KeyStates.check(Teclas[2])) {
	                ultimoHeading != Heading && (ultimoHeading = Heading);
	                Heading = common.Enums.Heading.North;
	            }
	            else if (input_1.KeyStates.check(Teclas[3])) {
	                ultimoHeading != Heading && (ultimoHeading = Heading);
	                Heading = common.Enums.Heading.West;
	            }
	            else {
	                Heading = null;
	            }
	        }
	        if (Heading != null) {
	            Camera.Mover(Heading);
	        }
	    }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine = __webpack_require__(1);
	var common = __webpack_require__(12);
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
	var map = __webpack_require__(19);
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
	            case common.Enums.Heading.South:
	                AddY += 32;
	                AddX = 0;
	                y++;
	                break;
	            case common.Enums.Heading.East:
	                AddX += 32;
	                AddY = 0;
	                x++;
	                break;
	            case common.Enums.Heading.North:
	                AddY -= 32;
	                AddX = 0;
	                y--;
	                break;
	            case common.Enums.Heading.West:
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Helpers = __webpack_require__(13);
	exports.Helpers = Helpers;
	var Enums = __webpack_require__(14);
	exports.Enums = Enums;
	var SimplePacket_1 = __webpack_require__(15);
	exports.SimplePacket = SimplePacket_1.SimplePacket;
	var Packets = __webpack_require__(16);
	exports.Packets = Packets;
	var WireProtocol_1 = __webpack_require__(17);
	exports.WireProtocol = WireProtocol_1.WireProtocol;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var enums = __webpack_require__(14);
	function headToPos(x, y, heading) {
	    switch (heading) {
	        case enums.Heading.East:
	            return {
	                x: x + 1,
	                y: y
	            };
	        case enums.Heading.West:
	            return {
	                x: x - 1,
	                y: y
	            };
	        case enums.Heading.North:
	            return {
	                x: x,
	                y: y - 1
	            };
	        case enums.Heading.South:
	            return {
	                x: x,
	                y: y + 1
	            };
	    }
	    return {
	        x: x,
	        y: y
	    };
	}
	exports.headToPos = headToPos;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	(function (Heading) {
	    Heading[Heading["North"] = 2] = "North";
	    Heading[Heading["South"] = 0] = "South";
	    Heading[Heading["East"] = 1] = "East";
	    Heading[Heading["West"] = 3] = "West";
	})(exports.Heading || (exports.Heading = {}));
	var Heading = exports.Heading;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var packets_1 = __webpack_require__(16);
	var SimplePacket = (function () {
	    function SimplePacket(id, data) {
	        this.id = id;
	        this.data = data;
	    }
	    SimplePacket.prototype.serialize = function () {
	        var raw = JSON.stringify({
	            id: this.id,
	            data: this.data
	        });
	        return raw;
	    };
	    SimplePacket.fromRaw = function (raw) {
	        try {
	            var parsed = JSON.parse(raw);
	            if (parsed.id) {
	                console.log('>>' + packets_1.PacketCodes[parsed.id] + ': ' + JSON.stringify(parsed.data));
	                return new SimplePacket(parsed.id, parsed.data);
	            }
	            else
	                throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw));
	        }
	        catch (e) {
	            console.error("ERROR PARSING MESSAGE", e, raw);
	            throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw));
	        }
	    };
	    return SimplePacket;
	}());
	exports.SimplePacket = SimplePacket;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SimplePacket_1 = __webpack_require__(15);
	(function (PacketCodes) {
	    // Client messages
	    PacketCodes[PacketCodes["CLI_Login"] = 0] = "CLI_Login";
	    PacketCodes[PacketCodes["CLI_Initialize"] = 1] = "CLI_Initialize";
	    PacketCodes[PacketCodes["CLI_Relogin"] = 2] = "CLI_Relogin";
	    PacketCodes[PacketCodes["CLI_Logout"] = 3] = "CLI_Logout";
	    PacketCodes[PacketCodes["CLI_UseItem"] = 4] = "CLI_UseItem";
	    PacketCodes[PacketCodes["CLI_Walk"] = 5] = "CLI_Walk";
	    PacketCodes[PacketCodes["CLI_Talk"] = 6] = "CLI_Talk";
	    PacketCodes[PacketCodes["CLI_SetHeading"] = 7] = "CLI_SetHeading";
	    // Server messages
	    PacketCodes[PacketCodes["EVT_Disconnected"] = 8] = "EVT_Disconnected";
	    PacketCodes[PacketCodes["EVT_Connected"] = 9] = "EVT_Connected";
	    PacketCodes[PacketCodes["SV_Welcome"] = 10] = "SV_Welcome";
	    PacketCodes[PacketCodes["SV_UpdateChar"] = 11] = "SV_UpdateChar";
	    PacketCodes[PacketCodes["SV_MoveChar"] = 12] = "SV_MoveChar";
	    PacketCodes[PacketCodes["SV_SetMap"] = 13] = "SV_SetMap";
	    PacketCodes[PacketCodes["SV_InventorySet"] = 14] = "SV_InventorySet";
	    PacketCodes[PacketCodes["SV_UpdateStats"] = 15] = "SV_UpdateStats";
	    PacketCodes[PacketCodes["SV_SetUserText"] = 16] = "SV_SetUserText";
	    PacketCodes[PacketCodes["SV_SetPlayerKey"] = 17] = "SV_SetPlayerKey";
	    PacketCodes[PacketCodes["SV_SetHeading"] = 18] = "SV_SetHeading";
	    PacketCodes[PacketCodes["SV_RemoveChar"] = 19] = "SV_RemoveChar";
	    PacketCodes[PacketCodes["SV_Talk"] = 20] = "SV_Talk";
	})(exports.PacketCodes || (exports.PacketCodes = {}));
	var PacketCodes = exports.PacketCodes;
	function createPacket(packet, data) {
	    return new SimplePacket_1.SimplePacket(packet, data);
	}
	exports.SV_UpdateChar = function (data) { return createPacket(PacketCodes.SV_UpdateChar, data); };
	exports.SV_SetMap = function (data) { return createPacket(PacketCodes.SV_SetMap, data); };
	exports.SV_SetHeading = function (data) { return createPacket(PacketCodes.SV_SetHeading, data); };
	exports.CLI_SetHeading = function (data) { return createPacket(PacketCodes.CLI_SetHeading, data); };
	exports.SV_RemoveChar = function (data) { return createPacket(PacketCodes.SV_RemoveChar, data); };
	exports.SV_MoveChar = function (data) { return createPacket(PacketCodes.SV_MoveChar, data); };
	exports.SV_Welcome = function (data) { return createPacket(PacketCodes.SV_Welcome, data); };
	exports.SV_SetPlayerKey = function (data) { return createPacket(PacketCodes.SV_SetPlayerKey, data); };
	exports.CLI_Walk = function (data) { return createPacket(PacketCodes.CLI_Walk, data); };
	exports.CLI_Initialize = function (data) { return createPacket(PacketCodes.CLI_Initialize, data); };
	exports.CLI_Talk = function (data) { return createPacket(PacketCodes.CLI_Talk, data); };
	exports.SV_Talk = function (data) { return createPacket(PacketCodes.SV_Talk, data); };


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var events_1 = __webpack_require__(18);
	var SimplePacket_1 = __webpack_require__(15);
	var WireProtocol;
	(function (WireProtocol) {
	    var Tape = (function (_super) {
	        __extends(Tape, _super);
	        function Tape() {
	            _super.apply(this, arguments);
	        }
	        Tape.prototype.handlePacket = function (raw) {
	            var packet = SimplePacket_1.SimplePacket.fromRaw(raw);
	            this.emit(Tape.ON_EVERY_CODE, packet.id, packet.data);
	            this.emit(packet.id.toString(), packet.data, packet);
	        };
	        Tape.prototype.when = function (packet, callback) {
	            this.on(packet.toString(), callback);
	            return this;
	        };
	        Tape.prototype.onEvery = function (callback) {
	            this.on(Tape.ON_EVERY_CODE, callback);
	            return this;
	        };
	        Tape.ON_EVERY_CODE = '-1';
	        return Tape;
	    }(events_1.EventEmitter));
	    WireProtocol.Tape = Tape;
	    var TapeHandler = (function () {
	        function TapeHandler(tape) {
	            var _this = this;
	            this.tape = tape;
	            this.handlers = {};
	            tape.onEvery(function (packet, data) {
	                if (packet in _this.handlers)
	                    _this.handlers[packet](data);
	                else
	                    console.error(packet + " NOT IMPLEMENTED!!!!");
	            });
	        }
	        return TapeHandler;
	    }());
	    WireProtocol.TapeHandler = TapeHandler;
	})(WireProtocol = exports.WireProtocol || (exports.WireProtocol = {}));


/***/ },
/* 18 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//define(['js/adz/mzengine/mzengine', 'js/adz/mzengine/camera', 'js/adz/mzengine/textures'], function(engine, Camera, textures){	
	var engine = __webpack_require__(1);
	var Camera = __webpack_require__(11);
	var textures = __webpack_require__(4);
	var that = this;
	that.Tile = function Tile() {
	};
	that.Tile.prototype.piso = null;
	that.Tile.prototype.capa1 = null;
	that.Tile.prototype.capa2 = null;
	that.Tile.prototype.capa3 = null;
	that.Tile.prototype.capa4 = null;
	that.Tile.prototype.char = null;
	var cacheTileSize = 16;
	exports.tileSize = 32;
	var cacheSize = cacheTileSize * exports.tileSize;
	exports.mapSize = 250;
	var cacheando = false;
	var cacheMax = 1;
	var cacheValue = 0;
	var areasCache = null;
	var Tileset = {};
	var mapData = [];
	function armarCapas(w, h) {
	    for (var x = 0; x < w; x++) {
	        mapData[x] = new Array(h);
	        for (var y = 0; y < h; y++) {
	            mapData[x][y] = new that.Tile;
	        }
	    }
	}
	var boundingBox = Camera.boundingBox;
	var tilesetsPedidas = 0;
	var tilesetsCargadas = 0;
	var recachearmapa = mz.delayer(function (cb) {
	    if (tilesetsPedidas == tilesetsCargadas) {
	        cachearMapa(cb);
	    }
	}, 500);
	var tilesetLoaded = function () {
	    tilesetsCargadas++;
	    //console.log(tilesetsPedidas, tilesetsCargadas);
	    recachearmapa();
	};
	var loadTileset = function (tileset, url) {
	    Tileset[tileset] = [];
	    //Tileset[tileset].url = url;
	    tilesetsPedidas++;
	    //textures.once(url + '_loaded', tilesetLoaded);
	    var ct = 0;
	    for (var y = 0; y < 16; y++) {
	        for (var x = 0; x < 32; x++) {
	            Tileset[tileset].push(textures.Grh(url, exports.tileSize, exports.tileSize, x * exports.tileSize, y * exports.tileSize));
	        }
	        ;
	    }
	    ;
	    textures.get(url).onLoaded(function () {
	        tilesetsCargadas++;
	        //console.log(tilesetsPedidas, tilesetsCargadas);
	        recachearmapa();
	    });
	};
	var tamanioCache = 0;
	function cachearSeccion(Cx, Cy) {
	    var canvasCache = document.createElement('canvas'), ctCache = canvasCache.getContext('2d');
	    canvasCache.width = cacheSize;
	    canvasCache.height = cacheSize;
	    engine.setContext(ctCache);
	    var c = {
	        minX: Cx * cacheTileSize,
	        minY: Cy * cacheTileSize,
	        maxX: Math.min((Cx + 1) * cacheTileSize, exports.mapSize),
	        maxY: Math.min((Cy + 1) * cacheTileSize, exports.mapSize)
	    };
	    var tX = 0, tY = 0;
	    for (var x = c.minX; x < c.maxX; x++) {
	        for (var y = c.minY; y < c.maxY; y++) {
	            mapData[x][y] && mapData[x][y].piso && mapData[x][y].piso(tX, tY);
	            tY += exports.tileSize;
	        }
	        ;
	        tY = 0;
	        tX += exports.tileSize;
	    }
	    ;
	    tX = 0;
	    tY = 0;
	    if (c.minX / cacheTileSize > 1) {
	        c.minX -= 1;
	        tX -= exports.tileSize;
	    }
	    if (c.minY / cacheTileSize > 1) {
	        c.minY -= 1;
	        tY -= exports.tileSize;
	    }
	    if (c.maxX < exports.mapSize)
	        c.maxX += 1;
	    if (c.maxY < exports.mapSize)
	        c.maxY += 1;
	    for (var y = c.minY; y < c.maxY; y++) {
	        for (var x = c.minX; x < c.maxX; x++) {
	            mapData[x][y] && mapData[x][y].capa1 && mapData[x][y].capa1(tX, tY);
	            mapData[x][y] && mapData[x][y].capa2 && mapData[x][y].capa2.centrado(tX, tY);
	            tY += exports.tileSize;
	        }
	        ;
	        tY = 0;
	        tX += exports.tileSize;
	    }
	    ;
	    engine.setContext(null);
	    return textures.GrhFromCache(canvasCache /*canvasCache.toDataURL("image/png")*/, cacheSize);
	}
	var cachearMapa = function (cb) {
	    tamanioCache = Math.ceil(exports.mapSize / cacheTileSize);
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
	                //console.log('CargandoMapa: ' + cacheValue + '/' + cacheMax, Cx, Cy);
	                cacheando = cacheValue != cacheMax;
	                cacheando || cb && cb();
	            }, 0, Cx, Cy, areasCache);
	        }
	        ;
	    }
	    ;
	};
	var chars = null;
	function init() {
	    armarCapas(exports.mapSize, exports.mapSize);
	    //this.loadMap();
	}
	exports.init = init;
	function render(elapsedTime) {
	    if (cacheando) {
	        engine.renderThisUI(function (ctx) {
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
	    var minX = boundingBox.minX - cacheTileSize;
	    var minY = boundingBox.minY - cacheTileSize;
	    for (var x = 0; x < tamanioCache; x++) {
	        for (var y = 0; y < tamanioCache; y++) {
	            var tX = x * cacheTileSize;
	            var tY = y * cacheTileSize;
	            if (tX < boundingBox.minX || tX > boundingBox.maxX || tY < boundingBox.minY || tY > boundingBox.maxY)
	                continue;
	            areasCache[x][y] && areasCache[x][y](x * cacheSize, y * cacheSize);
	        }
	        ;
	    }
	    for (var y_1 = boundingBox.minY; y_1 < boundingBox.maxY; y_1++) {
	        for (var x_1 = boundingBox.minX; x_1 < boundingBox.maxX; x_1++) {
	            mapData[x_1][y_1].capa3 && mapData[x_1][y_1].capa3.vertical(x_1 * exports.tileSize, y_1 * exports.tileSize);
	        }
	        ;
	    }
	    chars = chars || __webpack_require__(20) && __webpack_require__(20).chars;
	    for (var char in chars) {
	        chars[char].render(elapsedTime);
	    }
	}
	exports.render = render;
	function loadMap(data, cb) {
	    cacheando = true;
	    cacheMax = 1;
	    cacheValue = 0;
	    var listaGraficos = [
	        'cdn/grh/tilesets/1.png'
	    ];
	    textures.require(listaGraficos, function () {
	        loadTileset(0, 'cdn/grh/tilesets/1.png');
	        armarCapas(exports.mapSize, exports.mapSize);
	        for (var x = 0; x < exports.mapSize; x++) {
	            for (var y = 0; y < exports.mapSize; y++) {
	                mapData[x][y].piso = Tileset[0][x % 4 + (y % 4) * 32];
	            }
	        }
	        for (var i = 1; i < 100; i++) {
	            mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa1 = Tileset[0][48 + (Math.random() * 16) | 0];
	            mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa2 = Tileset[0][15];
	        }
	        /*
	                        mapData[0][0].capa3 =  textures.Grh('cdn/grh/png/7001.png',256,256,0,0,1);
	        
	                        for(var i = 1; i < 20; i++){
	                            mapData[(Math.random() * 50) | 0][(Math.random() * 50) | 0].capa3 =  textures.Grh('cdn/grh/png/7001.png',256,256,0,0,1);
	                        }
	                        */
	        recachearmapa(cb);
	    }, function progreso(total, cantidad) {
	        cacheMax = total;
	        cacheValue = cantidad;
	    });
	}
	exports.loadMap = loadMap;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var map = __webpack_require__(19);
	var engine = __webpack_require__(1);
	var bodies = __webpack_require__(8);
	var Camera = __webpack_require__(11);
	var common = __webpack_require__(12);
	var state = __webpack_require__(21);
	var ClientPlayer = (function () {
	    function ClientPlayer() {
	        this.x = 0;
	        this.y = 0;
	        this.body = new bodies.Body();
	        this.moving = false;
	        this.AddX = 0;
	        this.AddY = 0;
	        this.headTextColor = "#aaa";
	        this.key = (Math.random() * 100000).toString(16);
	    }
	    ClientPlayer.prototype.setPos = function (x, y) {
	        this.moving = false;
	        this.x = x;
	        this.y = y;
	        this.AddX = 0;
	        this.AddY = 0;
	    };
	    ClientPlayer.prototype.setChat = function (text) {
	        this.setText(text);
	    };
	    ClientPlayer.prototype.setText = function (text) {
	        this.headText = text;
	    };
	    ClientPlayer.prototype.render = function (elapsedTime, x, y) {
	        if (arguments.length == 1) {
	            x = this.x * map.tileSize - this.AddX;
	            y = this.y * map.tileSize - this.AddY;
	        }
	        if (this.key == state.playerKey) {
	            x = Camera.pos.x;
	            y = Camera.pos.y;
	        }
	        if (this.AddX > 0) {
	            this.AddX -= elapsedTime * Camera.velCamara;
	            if (this.AddX <= 0) {
	                this.moving = false;
	            }
	        }
	        if (this.AddX < 0) {
	            this.AddX += elapsedTime * Camera.velCamara;
	            if (this.AddX >= 0) {
	                this.moving = false;
	            }
	        }
	        if (this.AddY > 0) {
	            this.AddY -= elapsedTime * Camera.velCamara;
	            if (this.AddY <= 0) {
	                this.moving = false;
	            }
	        }
	        if (this.AddY < 0) {
	            this.AddY += elapsedTime * Camera.velCamara;
	            if (this.AddY >= 0) {
	                this.moving = false;
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
	        this.body && this.body.render(x, y, this.heading, this.moving);
	        this.headText && this.headText.length && engine.drawText(this.headText, x + 16, y - 45, true, this.headTextColor);
	    };
	    ClientPlayer.prototype.moveByHead = function (heading) {
	        switch (heading) {
	            case common.Enums.Heading.South:
	                this.AddY = map.tileSize;
	                this.AddX = 0;
	                this.y++;
	                break;
	            case common.Enums.Heading.East:
	                this.AddX = map.tileSize;
	                this.AddY = 0;
	                this.x++;
	                break;
	            case common.Enums.Heading.North:
	                this.AddY = -map.tileSize;
	                this.AddX = 0;
	                this.y--;
	                break;
	            case common.Enums.Heading.West:
	                this.AddX = -map.tileSize;
	                this.AddY = 0;
	                this.x--;
	                break;
	        }
	        this.heading = heading;
	        this.moving = true;
	    };
	    ClientPlayer.prototype.frenar = function () {
	        this.moving = false;
	        this.AddX = 0;
	        this.AddY = 0;
	    };
	    ClientPlayer.prototype.setHeading = function (heading) {
	        this.heading = heading;
	    };
	    return ClientPlayer;
	}());
	exports.ClientPlayer = ClientPlayer;
	exports.chars = {};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	exports.playerKey = null;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine = __webpack_require__(1);
	var tex = __webpack_require__(4);
	var lg = __webpack_require__(3);
	var hotBar = tex.Grh('cdn/ui/hotbar.png', 400, 64, 0, 0);
	var barras = tex.Grh('cdn/ui/barras.png', 200, 64, 0, 0);
	var frameInterno = tex.Grh('cdn/ui/frameinterno.png', 800, 600, 0, 0);
	engine.renderHud = function () {
	    if (lg.isVisible())
	        return;
	    frameInterno(0, 0);
	    hotBar(200, 600 - 64);
	    //barras(600, 600 - 64);
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(12);
	var handler_1 = __webpack_require__(24);
	var client = null;
	exports.tape = new common_1.WireProtocol.Tape();
	var handler = new handler_1.Handler(exports.tape);
	function connect(username) {
	    if (client && client.readyState == client.OPEN) {
	        //console.error("[CLI] Alredy connected");
	        return;
	    }
	    client = new WebSocket("ws://" + location.host + "/__c/" + username);
	    exports.tape.emit(common_1.WireProtocol.Tape.ON_EVERY_CODE, common_1.Packets.PacketCodes.EVT_Disconnected, {});
	    exports.tape.emit(common_1.Packets.PacketCodes.EVT_Disconnected.toString());
	    client.onclose = function () {
	        client = null;
	        exports.tape.emit(common_1.WireProtocol.Tape.ON_EVERY_CODE, common_1.Packets.PacketCodes.EVT_Disconnected, {});
	        exports.tape.emit(common_1.Packets.PacketCodes.EVT_Disconnected.toString());
	    };
	    client.onopen = function () {
	        exports.tape.emit(common_1.WireProtocol.Tape.ON_EVERY_CODE, common_1.Packets.PacketCodes.EVT_Connected, {});
	        exports.tape.emit(common_1.Packets.PacketCodes.EVT_Connected.toString());
	    };
	    client.onmessage = function (message) {
	        exports.tape.handlePacket(message.data);
	    };
	}
	exports.connect = connect;
	function send(packet) {
	    if (client && client.readyState == client.OPEN) {
	        if (packet instanceof common_1.SimplePacket)
	            client.send(packet.serialize());
	        else
	            client.send(packet);
	    }
	}
	exports.send = send;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var common_1 = __webpack_require__(12);
	var map = __webpack_require__(19);
	var chars = __webpack_require__(20);
	var client_1 = __webpack_require__(23);
	var state = __webpack_require__(21);
	var lg = __webpack_require__(3);
	var Camera = __webpack_require__(11);
	var dom_chat_1 = __webpack_require__(5);
	var p = common_1.Packets.PacketCodes;
	var Handler = (function (_super) {
	    __extends(Handler, _super);
	    function Handler(tape) {
	        _super.call(this, tape);
	        this.handlers = (_a = {},
	            _a[p.SV_Welcome] = function () {
	                client_1.send(common_1.Packets.CLI_Initialize({}));
	            },
	            _a[p.EVT_Disconnected] = function () {
	                lg.show();
	                state.playerKey = null;
	                for (var i in chars.chars) {
	                    delete chars.chars[i];
	                }
	            },
	            _a[p.SV_SetMap] = function (data) {
	                console.log("Loading map " + data.key);
	                map.loadMap(null, function () {
	                    // avisar al server que cargué el mapa
	                    lg.hide();
	                });
	            },
	            _a[p.SV_SetPlayerKey] = function (data) {
	                state.playerKey = data.player;
	            },
	            _a[p.SV_MoveChar] = function (data) {
	                var char = chars.chars[data.player];
	                if (char) {
	                    if (!isNaN(data.heading)) {
	                        char.moveByHead(data.heading);
	                    }
	                    else {
	                        char.setPos(data.x, data.y);
	                    }
	                }
	            },
	            _a[p.SV_UpdateChar] = function (data) {
	                var char = chars.chars[data.key];
	                if (!char) {
	                    char = chars.chars[data.key] = new chars.ClientPlayer();
	                }
	                char.body.setBody(data.body || 1);
	                char.body.setHead(data.head || 1);
	                char.body.name = data.nick;
	                char.setPos(data.x | 0, data.y | 0);
	                char.heading = data.heading | 0;
	                char.key = data.key;
	                if (data.key == state.playerKey) {
	                    Camera.setPos(char.x, char.y);
	                }
	            },
	            _a[p.SV_RemoveChar] = function (data) {
	                var char = chars.chars[data.player];
	                if (char) {
	                    delete chars.chars[data.player];
	                }
	            },
	            _a[p.SV_Talk] = function (data) {
	                var char = chars.chars[data.player];
	                if (char) {
	                    char.setChat(data.text);
	                }
	                dom_chat_1.chatPromptInstance.pushMessage(data);
	            },
	            _a
	        );
	        Camera.observable.on('moveByHead', function (heading, x, y) {
	            if (state.playerKey) {
	                if (chars.chars[state.playerKey]) {
	                    chars.chars[state.playerKey].moveByHead(heading);
	                    client_1.send(common_1.Packets.CLI_Walk({
	                        heading: heading
	                    }));
	                }
	            }
	        });
	        dom_chat_1.chatPromptInstance.on('chat', function (text) { return client_1.send(common_1.Packets.CLI_Talk({
	            text: text
	        })); });
	        var _a;
	    }
	    return Handler;
	}(common_1.WireProtocol.TapeHandler));
	exports.Handler = Handler;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map