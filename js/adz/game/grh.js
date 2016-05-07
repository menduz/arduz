define(["require", "exports", 'js/adz/mzengine/mzengine', 'js/adz/mzengine/textures'], function (require, exports, engine, textures) {
    "use strict";
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
});
