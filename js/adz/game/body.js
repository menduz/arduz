define(["require", "exports", 'js/adz/game/grh', 'js/adz/game/head', 'js/adz/mzengine/mzengine'], function (require, exports, grh, heads, engine) {
    "use strict";
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
        this.name && engine.renderTextCentered(this.name, x, y + 16);
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
                console.log(cuerpos);
                exports.loaded = true;
                cb && cb();
            }
        });
    };
    exports.loaded = false;
});