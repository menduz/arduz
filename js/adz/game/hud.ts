define(['js/adz/mzengine/mzengine', 'js/adz/mzengine/textures', 'js/adz/ui/loadingGame'], function(engine, tex, lg){
	var hotBar = tex.Grh('cdn/ui/hotbar.png', 400, 64, 0, 0);
	var barras = tex.Grh('cdn/ui/barras.png', 200, 64, 0, 0);
	var frameInterno = tex.Grh('cdn/ui/frameinterno.png', 800, 600, 0, 0);

	engine.renderHud = function(){

		if (lg.isVisible()) return;

		frameInterno(0,0);
		hotBar(200, 600 - 64);
		barras(600, 600 - 64);
	}
})