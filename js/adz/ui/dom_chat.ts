const MAX_MESSAGE_COUNT = 6;

@ChatPrompt.Template(`
    <div style="position: absolute; top:0; left: 0; width: 800px">
        <mz-repeat list="{this.messages}" tag="div" style="
            opacity: 0.5; 
            font-size: 0.8em; 
            padding: 20px; 
            pointer-events: none; 
            user-select: none;
            -webkit-user-select: none;
        ">
            <div style="
                max-width: 760px;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
                max-height: 2.4em;
                color: {scope.color || 'white'}
            "><b>{scope.nick}</b> {scope.text}</div>
        </mz-repeat>
        
        <input visible="{this.chatVisible}" name="chatInput" onkeyup="{this.keyPressed}" onkeydown="{this.hookKeys}" placeholder="Chat" style="
            position: absolute;
            background: rgba(100,100,100,0.5);
            color: white;
            top: 3px;
            left: 3px;
            width: 794px;
            border: 0;
            border-bottom: 1px solid rgba(50,50,50,0.8);
            padding: 7px 11px;
            outline: none;
            box-shadow: 0px 0px 4px 1px black inset;
        "/>
    </div>
`)
@ChatPrompt.ConfigureUnwrapped
export class ChatPrompt extends mz.widgets.BasePagelet {
    @ChatPrompt.proxy
    chatVisible: boolean;

    @ChatPrompt.proxy
    messages: mz.Collection<any>;

    input: HTMLInputElement;

    show = mz.delayer(() => {
        if (!this.chatVisible) {
            this.chatVisible = true;
            this.input.value = '';
            this.input.focus();
        }
    }, 100);

    hookKeys(e: mz.IMZComponentEvent) {
        if ((e.event as KeyboardEvent).which == 13 && this.chatVisible) {
            this.show.cancel();
        }
    }

    keyPressed(e: mz.IMZComponentEvent) {
        if ((e.event as KeyboardEvent).which == 13) {
            if ($(this.input).val().length) {
                this.emit('chat', $(this.input).val());
            }
            this.chatVisible = false;
            this.show.cancel();
        }
    }

    constructor() {
        super();
        this.messages = new mz.Collection;
        this.input = this.find('input')[0] as HTMLInputElement;
        setInterval(() => this.messages.length && this.messages.removeAt(0), 30000);
        this.chatVisible = false;
    }

    pushMessage(message: { text: string; nick: string; color?: string; }) {
        this.messages.push(message);
        while (this.messages.length > MAX_MESSAGE_COUNT) {
            this.messages.removeAt(0);
        }
    }
}

export var chatPromptInstance = new ChatPrompt;
