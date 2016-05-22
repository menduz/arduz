class keyStateObserver extends mz.EventDispatcher {
    keyStates: mz.Dictionary<boolean> = {};
    keyDown(cual: string) {
        this.keyStates[cual] = true;
        this.emit(cual as any, true);
        this.emit('key_down', cual);
        this.emit('key_down_' + cual);
    }
    keyUp(cual: string) {
        this.keyStates[cual] = false;
        this.emit(cual as any, false);
        this.emit('key_up', cual);
        this.emit('key_up_' + cual);
    }
    check(cual: string) {
        return !!this.keyStates[cual];
    }
    
    appendTo(element?){
        $(element || document).keydown((e) => this.keyDown(e.keyCode.toString()));
        $(element || document).keyup((e) => this.keyUp(e.keyCode.toString()));
    }
}

export var KeyStates = new keyStateObserver;