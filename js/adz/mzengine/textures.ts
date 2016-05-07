

define(['js/adz/mzengine/mzengine'],function(mzengine){
	var DB = {};

	var that = new mz.EventDispatcher();

	that.Textura = function(url, callback){
		var image = new Image();

		image._loaded = { loaded: false };
		image.queueOnLoaded = [];

		

		image.addEventListener("load", function(){
			image._loaded.loaded = true;
			that.trigger(url + '_loaded', image);

			for(var i in image.queueOnLoaded)
				image.queueOnLoaded[i](image, url);

			image.queueOnLoaded = [];
		}, false);

		image.src = url;

		image.onLoaded = function(cb){
			if(image._loaded.loaded)
				cb(image, url);
			else
				image.queueOnLoaded.push(cb);
		}

		return image;
	};

	that.get = function(url){
		return url in DB ? DB[url] : (DB[url] = that.Textura(url));
	}

	that.require = function(list, cb, onProgress){
		var esperar = false;
		var ct = list.length;

		list.forEach(function(e){
			that.get(e).onLoaded(function(img, url){
				ct--;
				onProgress && onProgress(list.length + 1, list.length - ct);
				if(ct == 0)
					cb && cb();
			})
		})
	}

	that.Grh = function(tex,w,h,srcX,srcY){
		var t = that.get(tex);

		var r = function(x,y){
			mzengine.drawImage(t,srcX,srcY,w,h,x,y,w,h);
		};

		try {
			mz.copy(r, {get loaded(){ return t._loaded.loaded;}});
		} catch(e){
			console.log('No pude definir getter :(');
			r.loaded = t.loaded;
			if(!t.loaded){
				t.onLoaded(function(){
					r.loaded = true;
				})
			}
		}

		r.halfCenterX = (w / 2 - 16) | 0;
		r.halfCenterY = (h / 2 - 16) | 0;
		r.halfCenterYv = (h - 16) | 0;
		
		r.centrado = function(x,y){
			mzengine.drawImage(t,srcX,srcY,w,h,x - r.halfCenterX,y - r.halfCenterY,w,h);
		};

		r.vertical = function(x,y){
			mzengine.drawImage(t,srcX,srcY,w,h,x - r.halfCenterX,y - r.halfCenterYv,w,h);
		};

		r.width = w;
		r.height = h;
		
		r.texture = t;
		return r
	}

	that.GrhFromCache = function(URL, cacheSize){
		var t = null;

		if(typeof URL == 'object'){
			t = URL;
		} else {
			t = new Image();
			t.src = URL;
		}

		var r = function(x,y){
			mzengine.drawImage(t,0,0,cacheSize,cacheSize,x,y,cacheSize,cacheSize);
		}

		r.objeto = t;

		return r;
	}

	return that;
})