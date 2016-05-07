export class TextureDBClass extends mz.EventDispatcher {
    DB: mz.Dictionary<IImage> = {};
    get(url: string): IImage {
        return url in this.DB ? this.DB[url] : (this.DB[url] = Texture(url));
    }
}

export var TextureDB = new TextureDBClass;

declare interface IImage extends HTMLImageElement {
    _loaded: { loaded: boolean; };
}

export var Texture = function (url: string, callback?): IImage {
    let image: IImage = mz.copy(new Image(), {
        _loaded: { loaded: false },
        src: url
    });

    image.addEventListener("load", function () {
        image._loaded.loaded = true;
        TextureDB.trigger(url + '_loaded', image);
        callback && callback(image);
    }, false);

    return image;
}
