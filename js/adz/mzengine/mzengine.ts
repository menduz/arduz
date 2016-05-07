define(function(){
	var that = this;

	var requestAnimationFrame = 
	
	window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || 
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};


	var win = null, map = null, cam = null;

	require('js/adz/mzengine/window', function(w){ win = w });
	
	require('js/adz/mzengine/camera', function(m){ 
		cam = m;
		require('js/adz/mzengine/map', function(m){ 
			map = m; 
			map.init(); 
		});
	});

	var timer = 'performance' in window ? function(){ return performance.now() } : function(){ return Date.now && Date.now() || new Date.getTime() };

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

	var setSize = function(w,h){
		width = w;
		height = h;

		size.width = w;
		size.height = h;

		canvas.width = w;
		canvas.height = h;
	}

	function render() {
	    requestAnimationFrame( render );
		clearScreen();


		var nowTime = that.tick = timer();

		elapsedTime = nowTime - lastRender;

		lastRender = nowTime;

        var diffTime = nowTime - lastTime;

        if (diffTime >= 1000) {
            realFPS = frameCount;
            frameCount = 0;
            lastTime = nowTime;
        }

        frameCount++;

        if(cam){
    		

			ctx.save();
			ctx.transformado = true;

			cam.update(elapsedTime);
			map && map.render(elapsedTime);

			ctx.restore();
			ctx.transformado = false;

			win && win.render();

			that.renderHud && that.renderHud();

	}
	    drawFPS(elapsedTime);
	}

	function clearScreen(){
		ctx.clearRect(0, 0, width, height);
	}

	function drawText(text, x, y, centered, color ) {
        if(text && x && y) {
            ctx.save();
            if(centered) {
                ctx.textAlign = "center";
            }
            ctx.fillStyle = color || "white";
            ctx.fillText(text, x, y);
            ctx.restore();
        }
    }

    function drawTextStroked(text, x, y, centered, color, strokeColor) {
        if(text && x && y) {
            ctx.save();
            if(centered) {
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

    this.tick = 0;

	this.init = function(_canvas, w, h){
		canvas = _canvas;

		octx = ctx = canvas.getContext( '2d' );

		this.drawImage = function(){ ctx.drawImage.apply(ctx, arguments) };

		setSize(w || 800,h || 600);

		lastTime = timer();
		lastRender = lastTime;

		render();
	};

	this.getSize = function(){
		return size;
	};

	this.drawImage = function() { /* empty */ }

	this.renderThisUI = function(fn){
		ctx.save();

		if(ctx.transformado){
			cam && cam.unstranslate();
		}

		try {
			fn(ctx);
		} catch(e){
			console.error(e);
		}

		ctx.restore();
	}

	this.setContext = function(c){
		ctx = c || octx;
	}

	this.translate = function(x, y){
		ctx && ctx.translate(x,y)
	}

	this.renderHud = null;
})