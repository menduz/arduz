var ventanas = [];


var vPush = function (v) {
	var ind = -1;
	if ((ind = ventanas.indexOf(v)) != -1) {
		ventanas.push(ventanas.splice(ind, 1)[0]);
	} else {
		ventanas.push(v);
	}
}

var vPop = function (v) {
	var ind = -1;
	if ((ind = ventanas.indexOf(v)) != -1) {
		ventanas.splice(ind, 1);
	}
}

export abstract class MzWindow extends mz.EventDispatcher {
	show() {
		vPush(this);
		this.trigger('show');
	}
	hide() {
		vPop(this);
		this.trigger('hide');
	}
	abstract render(x, y);
	width = 0;
	height = 0;
	x = 0;
	y = 0;
	setSize(w: number, h: number) {
		this.width = w | 0;
		this.height = h | 0;
		this.trigger('resize');
	}
	setPos(x: number, y: number) {
		this.x = x | 0;
		this.y = y | 0;
	}
	isVisible(): boolean {
		return ventanas.indexOf(this) != -1;
	}

}

export function render() {
	ventanas.forEach(function (e) { e.render() })
}

export function isVisible(window: MzWindow): boolean {
	return window && ventanas.indexOf(window) != -1;
}