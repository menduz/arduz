define(['js/adz/mzengine/input', 'js/adz/mzengine/camera'], function(input, Camera){
	var KeyStates = input.KeyStates;
	

	var Heading = null;

	var HeadingHist = [0,1,2,3];

	var Teclas = [40,39,38,37];

	var ultimoHeading = null;

	KeyStates.bind(37, function(b){
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 3;
    });

    KeyStates.bind(38, function(b){
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 2;
    });

    KeyStates.bind(39, function(b){
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 1;
    });

    KeyStates.bind(40, function(b){
        ultimoHeading != Heading && (ultimoHeading = Heading);
        Heading = 0;
    });

	Camera.bindFn(function(){
		if(!Camera.isMoving()){
			if(!KeyStates.check(Teclas[Heading])){
				if(KeyStates.check(Teclas[ultimoHeading])){
					var t = ultimoHeading;
					ultimoHeading != Heading && (ultimoHeading = Heading);
					Heading = t;
				} else if(KeyStates.check(Teclas[0])){
					ultimoHeading != Heading && (ultimoHeading = Heading);
					Heading = 0;
				} else if(KeyStates.check(Teclas[1])){
					ultimoHeading != Heading && (ultimoHeading = Heading);
					Heading = 1;
				} else if(KeyStates.check(Teclas[2])){
					ultimoHeading != Heading && (ultimoHeading = Heading);
					Heading = 2;
				} else if(KeyStates.check(Teclas[3])){
					ultimoHeading != Heading && (ultimoHeading = Heading);
					Heading = 3;
				} else {
					Heading = null;
				}
			}

			if(Heading != null){
				Camera.Mover(Heading);
			}
		}
	})
})