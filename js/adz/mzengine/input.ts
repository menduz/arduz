class keyStateObserver extends mz.EventDispatcher {
    keyStates: mz.Dictionary<boolean> = {};
    keyDown(cual: string) {
        this.keyStates[cual] = true;
        this.emit(cual as any, true);
    }
    keyUp(cual: string) {
        this.keyStates[cual] = false;
        this.emit(cual as any, false);
    }
    check(cual: string) {
        return !!this.keyStates[cual];
    }
    constructor() {
        super();
        $(document).keydown((e) => this.keyDown(e.keyCode.toString()));
        $(document).keyup((e) => this.keyUp(e.keyCode.toString()));
    }
}

export var KeyStates = new keyStateObserver;