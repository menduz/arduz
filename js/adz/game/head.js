define(["require", "exports", 'js/adz/game/grh'], function (require, exports, grh) {
    "use strict";
    var DB = {};
    var DBHelmets = {};
    var heads = {};
    var helmets = {};
    exports.Head = function Head(head) {
        this.grh = {
            0: grh.get(head.g[1]),
            1: grh.get(head.g[2]),
            2: grh.get(head.g[3]),
            3: grh.get(head.g[4])
        };
    };
    exports.Head.prototype.grh = null;
    exports.Head.prototype.render = function (x, y, heading) {
        this.grh && this.grh[heading] && this.grh[heading].quiet(x - this.grh[heading].centerX, y);
    };
    exports.Head.prototype.renderBottomAligned = function (x, y, heading) {
        this.grh && this.grh[heading] && this.grh[heading].quiet(x - this.grh[heading].centerX, y - this.grh[heading].height);
    };
    exports.get = function (index) {
        return heads[index] && (DB[index] = DB[index] || new exports.Head(heads[index])) || null;
    };
    exports.getHelmet = function (index) {
        return helmets[index] && (DBHelmets[index] = DBHelmets[index] || new exports.Head(helmets[index])) || null;
    };
    function parseInto(obj, e) {
        var headHeader = /\[HEAD(\d+)\]/;
        var grhHeader = /Head(1|2|3|4)=(\d+)/;
        var data = e.split(/(\n)/g);
        var actualHead = null;
        for (var i in data) {
            var d = mz.trim(data[i]);
            var t = void 0;
            if (t = headHeader.exec(d)) {
                actualHead = {
                    g: { 1: 0, 2: 0, 3: 0, 4: 0 },
                    i: t[1]
                };
                obj[t[1]] = actualHead;
            }
            else if (t = grhHeader.exec(d)) {
                actualHead && (actualHead.g[t[1]] = parseInt(t[2]));
            }
        }
    }
    exports.loadHeadsRaw = function (url, cb) {
        $.ajax({
            url: url || 'cdn/indexes/cabezas.txt',
            method: 'GET',
            success: function (e) {
                parseInto(heads, e);
                cb && cb();
            }
        });
    };
    exports.loadHelmetsRaw = function (url, cb) {
        $.ajax({
            url: url || 'cdn/indexes/cascos.txt',
            method: 'GET',
            success: function (e) {
                parseInto(helmets, e);
                cb && cb();
            }
        });
    };
});
