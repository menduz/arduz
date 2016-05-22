import { Packets, WireProtocol, SimplePacket } from '../../../common'
import {Handler} from './handler'


var client: WebSocket = null;

export var tape = new WireProtocol.Tape();

var handler = new Handler(tape);

export function connect(username: string) {
    if (client && client.readyState == client.OPEN) {
        //console.error("[CLI] Alredy connected");
        return;
    }

    client = new WebSocket("ws://" + location.host + "/__c/" + username);

    tape.emit(WireProtocol.Tape.ON_EVERY_CODE, Packets.PacketCodes.EVT_Disconnected, {});
    tape.emit(Packets.PacketCodes.EVT_Disconnected.toString());

    client.onclose = () => {
        client = null;
        tape.emit(WireProtocol.Tape.ON_EVERY_CODE, Packets.PacketCodes.EVT_Disconnected, {});
        tape.emit(Packets.PacketCodes.EVT_Disconnected.toString());
    }

    client.onopen = () => {
        tape.emit(WireProtocol.Tape.ON_EVERY_CODE, Packets.PacketCodes.EVT_Connected, {});
        tape.emit(Packets.PacketCodes.EVT_Connected.toString());
    }

    client.onmessage = (message) => {
        tape.handlePacket(message.data);
    }
}

export function send(packet: SimplePacket | string) {
    if (client && client.readyState == client.OPEN) {
        if (packet instanceof SimplePacket)
            client.send(packet.serialize());
        else
            client.send(packet);
    }
}