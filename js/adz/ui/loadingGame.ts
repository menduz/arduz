
import * as engine from '../mzengine/mzengine';
import * as textures from '../mzengine/textures';
import * as win from '../mzengine/window';

export = new LoadingWindow;

class LoadingWindow extends win.MzWindow {
	value = 0;
	offX = 400;
	offY = 300;
	show() {
		this.value = 0;
		super.show();
	}
	hide() {
		this.value = 0;
		super.hide();
	}
	render() {

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
			})
		}

		engine.drawImage(textures.get('cdn/adz.png'), 80, 60, 640, 480);
	}
	setProgress(value, min) {
		if (arguments.length == 2) {
			this.value = min / value;
		} else {
			this.value = value || 0;
		}
	}
}
