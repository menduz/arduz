define(['js/adz/mzengine/mzengine', 'js/adz/mzengine/textures', 'js/adz/mzengine/window'], function(engine, textures, win){

	return new (win.extend({
		value: 0,
		offX: 400,
		offY: 300,
		show: function(){
			this.value = 0;
			this._super();
		},
		hide: function(){
			this.value = 0;
			this._super();
		},
		render: function(){
			
			if(this.value){
				var that = this;
				engine.renderThisUI(function(ctx){
					var circ = Math.PI * 2;
					var quart = Math.PI / 2;

					ctx.strokeStyle = '#FF1100';
					ctx.lineCap = 'round';
					ctx.lineWidth = 20.0;

					ctx.beginPath();
				    ctx.arc(that.offX, that.offY, 150, -quart, circ * that.value - quart, false);
				    ctx.stroke();
				})
			}

			engine.drawImage(textures.get('cdn/adz.png'), 80, 60, 640, 480);
		},
		setProgress: function(value, min){
			if(arguments.length == 2){
				this.value = min / value;
			} else {
				this.value = value || 0;
			}
		}
	}));
})