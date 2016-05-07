var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var TextureDBClass = (function (_super) {
        __extends(TextureDBClass, _super);
        function TextureDBClass() {
            _super.apply(this, arguments);
            this.DB = {};
        }
        TextureDBClass.prototype.get = function (url) {
            return url in this.DB ? this.DB[url] : (this.DB[url] = exports.Texture(url));
        };
        return TextureDBClass;
    }(mz.EventDispatcher));
    exports.TextureDBClass = TextureDBClass;
    exports.TextureDB = new TextureDBClass;
    exports.Texture = function (url, callback) {
        var image = mz.copy(new Image(), {
            _loaded: { loaded: false },
            src: url
        });
        image.addEventListener("load", function () {
            image._loaded.loaded = true;
            exports.TextureDB.trigger(url + '_loaded', image);
            callback && callback(image);
        }, false);
        return image;
    };
});
