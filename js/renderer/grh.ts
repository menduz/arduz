import { TextureDB } from './texture-db';
import * as engine from './engine';

declare interface IGrh {
    (x: number, y: number): void;
    loaded: boolean;
    texture: HTMLImageElement;
}

export function Grh(tex, w, h, srcX, srcY): IGrh {
    var t = TextureDB.get(tex);

    var r: IGrh = mz.copy(
        function (x: number, y: number) {
            engine.globalContext.drawImage(t, srcX, srcY, w, h, x, y, w, h);
        },
        {
            loaded: t._loaded.loaded,
            texture: t
        }
    );

    if (!t._loaded.loaded) {
        TextureDB.once(tex + '_loaded', () => r.loaded = true);
    }

    return r
}