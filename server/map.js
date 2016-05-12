"use strict";
var MapBlock = (function () {
    function MapBlock() {
        this.blocked = false;
    }
    return MapBlock;
}());
exports.MapBlock = MapBlock;
var Map = (function () {
    function Map(size) {
        if (size === void 0) { size = 255; }
        this.size = size;
        this.blocks = [];
        this.blocks = [];
        for (var x = 0; x < size; x++) {
            var row = [];
            this.blocks.push(row);
            for (var y = 0; y < size; y++) {
                row.push(new MapBlock);
            }
        }
    }
    Map.prototype.canUserMove = function (x, y, heading) {
        return true;
    };
    return Map;
}());
exports.Map = Map;
