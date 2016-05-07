
function RequireList() { // var instance = new RequireList();
    var rlcount = 0;
    var pending = 0;

    var onEnd = null;
    var terminado = false;

    var ret = function (cb) { // async(instance(/* opt cb */))
        rlcount++;
        pending++;
        var done = false;
        terminado = false;
        return function () {
            cb && cb.apply(null, arguments);
            if (done == false) {
                pending--;
                if (pending == 0) {
                    terminado = true;
                    onEnd && onEnd();
                }
            }
        }
    };

    ret.onEnd = function (onend) {
        onEnd = onend;
        if (terminado) {
            onEnd && onEnd();
        }
    }

    return ret;
}

var requireList = RequireList;


$(function () {
    require(['js/adz/mzengine/mzengine', 'js/adz/ui/loadingGame'], function (engine, lg) {
        engine.init(document.getElementById('juego'));

        lg.show();

        var requireListGameEngine = requireList();

        var cbGraficos = requireListGameEngine(function () {
            console.info('Graficos cargados!');
        })

        var cbCuerpos = requireListGameEngine(function () {
            console.info('Cuerpos cargados!');
        })

        var cbCabezas = requireListGameEngine(function () {
            console.info('Cabezas cargados!');
        })

        var cbCascos = requireListGameEngine(function () {
            console.info('Cascos cargados!');
        })

        require('js/adz/game/grh', function (e) {
            e.cargarGraficosRaw('cdn/indexes/graficos.txt', cbGraficos);
        })

        require('js/adz/game/body', function (e) {
            e.loadRaw('cdn/indexes/cuerpos.txt', cbCuerpos);
        })

        require('js/adz/game/head', function (e) {
            e.loadHeadsRaw('cdn/indexes/cabezas.txt', cbCabezas);
            e.loadHelmetsRaw('cdn/indexes/cascos.txt', cbCascos);
        })

        requireListGameEngine.onEnd(function () {
            console.log('-------------- Indices cargados --------------');

            require('js/adz/game/input', function () {
                console.log('Cargado el input');
                require('js/adz/game/hud', function () {
                    console.log('Cargado el hud');



                    require('js/adz/mzengine/camera', function (Camera) {
                        engine.cameraInitialized(Camera);
                        require('js/adz/game/char', function (char) {

                            Camera.observable.on('moveByHead', function (heading, x, y) {
                                char.mainChar && char.mainChar.moveByHead(heading);
                            })

                            
                        });
                    });



                    require('js/adz/mzengine/map', function (map) {
                        engine.mapInitialized(map);
                        map.loadMap(null, function () {
                            require('js/adz/game/char', function (char) {
                                var myChara = char.BodyFactory(1, 1, 45);
                                char.chars.push(myChara);

                                setInterval(function () {
                                    myChara.moveByHead(((Math.random() * 700) % 4) | 0)
                                }, 192)

                                var mainChar = char.BodyFactory(1, 4, 45);

                                char.chars.push(mainChar);

                                char.mainChar = mainChar;
                                
                                lg.hide()
                            })
                        })
                    })



                });
            });
        })
    })
})