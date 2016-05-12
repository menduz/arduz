import {WireProtocol} from '../../../common/protocol';
import {PacketCodes} from '../../../common/packets';

var client: WebSocket = null;

export var tape = new WireProtocol.Tape();


export function connect(username: string) {
    if (client && client.readyState == client.OPEN) {
        console.error("[CLI] Alredy connected");
        return;
    }

    client = new WebSocket("ws://" + location.host + "/__c/" + username);

    tape.emit(PacketCodes.Disconnected.toString());

    client.onclose = () => {
        client = null;
        tape.emit(PacketCodes.Disconnected.toString());
    }

    client.onopen = () => {
        tape.emit(PacketCodes.Connected.toString());
    }

    client.onmessage = (message) => {
        tape.handlePacket(message.data);
    }
}