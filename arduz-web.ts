import engine = require('./js/adz/mzengine/mzengine');
import lg = require('./js/adz/ui/loadingGame');
import client = require('./js/adz/net/client');

function RequireList() { // var instance = new RequireList();
    var rlcount = 0;
    var pending = 0;

    var onEnd = null;
    var terminado = false;

    var ret = mz.copy(
        function (cb) { // async(instance(/* opt cb */))
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
        }, {
            onEnd: function (onend) {
                onEnd = onend;
                if (terminado) {
                    onEnd && onEnd();
                }
            }
        }
    );

    return ret;
}

var requireList = RequireList;



$(function () {
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

    require('./js/adz/game/grh').cargarGraficosRaw('cdn/indexes/graficos.txt', cbGraficos);


    require('./js/adz/game/body').loadRaw('cdn/indexes/cuerpos.txt', cbCuerpos);


    var heads = require('./js/adz/game/head')

    heads.loadHeadsRaw('cdn/indexes/cabezas.txt', cbCabezas);
    heads.loadHelmetsRaw('cdn/indexes/cascos.txt', cbCascos);


    requireListGameEngine.onEnd(function () {
        console.log('-------------- Indices cargados --------------');

        require('./js/adz/game/input');
        console.log('Cargado el input');
        require('./js/adz/game/hud');
        console.log('Cargado el hud');



        var Camera = require('./js/adz/mzengine/camera');
        engine.cameraInitialized(Camera);
        var char = require('./js/adz/game/char');

        Camera.observable.on('moveByHead', function (heading, x, y) {
            char.mainChar && char.mainChar.moveByHead(heading);
        })







        var map = require('./js/adz/mzengine/map');
        engine.mapInitialized(map);
        map.loadMap(null, function () {

            var myChara = char.BodyFactory(1, 5, 45);
            char.chars.push(myChara);

            setInterval(function () {
                myChara.moveByHead(((Math.random() * 700) % 4) | 0)
            }, 192)

            var mainChar = char.BodyFactory(1, 4, 45);

            mainChar.body.name = "menduz"

            char.chars.push(mainChar);

            char.mainChar = mainChar;

            lg.hide()


        });
    });
})

client.connect("mz");
setInterval(() => client.connect("mz"), 3000)