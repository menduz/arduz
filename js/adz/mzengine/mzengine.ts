import * as win from './window';

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
}

function render() {
	requestAnimationFrame(render);
	clearScreen();


	var nowTime = tick = timer();

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

		renderHud && renderHud();

	}
	drawFPS(elapsedTime);
}

function clearScreen() {
	ctx.clearRect(0, 0, width, height);
}

export function drawText(text: string, x: number, y: number, centered: boolean, color?) {
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

export function renderTextCentered(text, x, y, color?) {
	drawText(text, x, y, true, color);
}

export function drawTextStroked(text, x, y, centered, color, strokeColor) {
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

	drawText("FPS: " + realFPS, 753, 20, false);
}

export var tick = 0;

export var init = function (_canvas, w?, h?) {
	canvas = _canvas;

	octx = ctx = canvas.getContext('2d');

	this.drawImage = function () { ctx.drawImage.apply(ctx, arguments) };

	setSize(w || 800, h || 600);

	lastTime = timer();
	lastRender = lastTime;

	render();
};

export var getSize = function () {
	return size;
};

export var drawImage: any = function () { /* empty */ }

export var renderThisUI = function (fn) {
	ctx.save();

	if (ctx.transformado) {
		cam && cam.unstranslate();
	}

	try {
		fn(ctx);
	} catch (e) {
		console.error(e);
	}

	ctx.restore();
}

export var setContext = function (c) {
	ctx = c || octx;
}

export var translate = function (x, y) {
	ctx && ctx.translate(x, y)
}

export var renderHud = null;

export function cameraInitialized(_){
	cam = _;
}

export function mapInitialized(_){
	map = _;
	map.init();
}