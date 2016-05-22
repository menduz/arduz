
import {KeyStates} from '../mzengine/input'
import * as Camera from '../mzengine/camera'
import * as common from '../../../common'

import {chatPromptInstance} from '../ui/dom_chat'

var Heading = null;

var HeadingHist = [0, 1, 2, 3];

var Teclas = ['40', '39', '38', '37'];

var ultimoHeading = null;

KeyStates.on('37', function (b) {
	ultimoHeading != Heading && (ultimoHeading = Heading);
	Heading = common.Enums.Heading.West;
});

KeyStates.on('38', function (b) {
	ultimoHeading != Heading && (ultimoHeading = Heading);
	Heading = common.Enums.Heading.North;
});

KeyStates.on('39', function (b) {
	ultimoHeading != Heading && (ultimoHeading = Heading);
	Heading = common.Enums.Heading.East;
});

KeyStates.on('40', function (b) {
	ultimoHeading != Heading && (ultimoHeading = Heading);
	Heading = common.Enums.Heading.South;
});

KeyStates.on('key_down_13', () => chatPromptInstance.show());

Camera.bindFn(function () {
	if (!Camera.isMoving()) {
		if (!KeyStates.check(Teclas[Heading])) {
			if (KeyStates.check(Teclas[ultimoHeading])) {
				var t = ultimoHeading;
				ultimoHeading != Heading && (ultimoHeading = Heading);
				Heading = t;
			} else if (KeyStates.check(Teclas[0])) {
				ultimoHeading != Heading && (ultimoHeading = Heading);
				Heading = common.Enums.Heading.South;
			} else if (KeyStates.check(Teclas[1])) {
				ultimoHeading != Heading && (ultimoHeading = Heading);
				Heading = common.Enums.Heading.East;
			} else if (KeyStates.check(Teclas[2])) {
				ultimoHeading != Heading && (ultimoHeading = Heading);
				Heading = common.Enums.Heading.North;
			} else if (KeyStates.check(Teclas[3])) {
				ultimoHeading != Heading && (ultimoHeading = Heading);
				Heading = common.Enums.Heading.West;
			} else {
				Heading = null;
			}
		}

		if (Heading != null) {
			Camera.Mover(Heading);
		}
	}
})