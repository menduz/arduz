define(["require", "exports", './texture-db', './engine'], function (require, exports, texture_db_1, engine) {
    "use strict";
    function Grh(tex, w, h, srcX, srcY) {
        var t = texture_db_1.TextureDB.get(tex);
        var r = mz.copy(function (x, y) {
            engine.globalContext.drawImage(t, srcX, srcY, w, h, x, y, w, h);
        }, {
            loaded: t._loaded.loaded,
            texture: t
        });
        if (!t._loaded.loaded) {
            texture_db_1.TextureDB.once(tex + '_loaded', function () { return r.loaded = true; });
        }
        return r;
    }
    exports.Grh = Grh;
});
