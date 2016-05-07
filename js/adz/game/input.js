define(["require", "exports", 'js/adz/mzengine/input', 'js/adz/mzengine/camera'], function (require, exports, input_1, Camera) {
    "use strict";
    var Heading = null;
    var HeadingHist = [0, 1, 2, 3];
    var Teclas = ['40', '39', '38', '37'];
    var ultimoHeading = null;
    input_1.KeyStates.on('37', function (b) {
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 3;
    });
    input_1.KeyStates.on('38', function (b) {
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 2;
    });
    input_1.KeyStates.on('39', function (b) {
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 1;
    });
    input_1.KeyStates.on('40', function (b) {
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 0;
    });
    Camera.bindFn(function () {
        if (!Camera.isMoving()) {
            if (!input_1.KeyStates.check(Teclas[Heading])) {
                if (input_1.KeyStates.check(Teclas[ultimoHeading])) {
                    var t = ultimoHeading;
                    ultimoHeading != Heading && (ultimoHeading = Heading);
                    Heading = t;
                }
                else if (input_1.KeyStates.check(Teclas[0])) {
                    ultimoHeading != Heading && (ultimoHeading = Heading);
                    Heading = 0;
                }
                else if (input_1.KeyStates.check(Teclas[1])) {
                    ultimoHeading != Heading && (ultimoHeading = Heading);
                    Heading = 1;
                }
                else if (input_1.KeyStates.check(Teclas[2])) {
                    ultimoHeading != Heading && (ultimoHeading = Heading);
                    Heading = 2;
                }
                else if (input_1.KeyStates.check(Teclas[3])) {
                    ultimoHeading != Heading && (ultimoHeading = Heading);
                    Heading = 3;
                }
                else {
                    Heading = null;
                }
            }
            if (Heading != null) {
                Camera.Mover(Heading);
            }
        }
    });
});
