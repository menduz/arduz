"use strict";
var mzengine = require('./mzengine');
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
