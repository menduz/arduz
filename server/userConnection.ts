import { SimplePacket } from '../common/packet';
import { WireProtocol } from '../common/protocol';
import { Player } from './player';
import { Map } from './map';
import { PacketCodes } from '../common/packets';
import * as WebSocket from 'ws';

const areaWidth = 16;
const areaHeight = 12;

const halfAreaWidth = Math.floor(areaWidth / 2) + 1;
const halfAreaHeight = Math.floor(areaHeight / 2) + 1;

export var ConnectionList: UserConnection[] = [];

export class UserConnection {
    player: Player;

    tape: WireProtocol.Tape = new WireProtocol.Tape;

    sendToAllButMe(packet: SimplePacket) {
        ConnectionList.forEach(userConnection => {
            if (userConnection == this) return;
            userConnection.send(packet);
        })
    }

    sendToArea(packet: SimplePacket) {
        if (!this.player || !this.player.map) return;

        sendToArea(packet, this.player.map, this.player.x, this.player.y);
    }

    sendToMap(packet: SimplePacket) {
        if (!this.player || !this.player.map) return;

        sendToMap(packet, this.player.map);
    }

    send(packet: SimplePacket | string) {

        if (packet instanceof SimplePacket) {
            console.log('>>' + PacketCodes[packet.id] + ":" + JSON.stringify(packet.data));
            this.connection.send(packet.serialize());
        } else {
            console.log('>>RAW: ' + + JSON.stringify(packet));
            this.connection.send(packet);
        }
    }

    constructor(public connection: WebSocket) {
        console.log('Opening connection.');

        connection.on('close', error => {
            let index = ConnectionList.indexOf(this);
            if (index != -1) {
                ConnectionList.splice(index, 1);
            }
            this.tape.emit(PacketCodes.Disconnected.toString());
            console.log('\tActive connections: ' + ConnectionList.length);
        });

        ConnectionList.push(this);

        connection.on('message', (data, flags) => {
            try {
                this.tape.handlePacket(data);
            } catch (e) {
                this.close();
            }
        });

        console.log('\tActive connections: ' + ConnectionList.length);
    }

    close() {
        console.log('Closing connection...');
        this.connection.close();
    }
}

export function sendToAll(packet: SimplePacket | string) {
    ConnectionList.forEach(userConnection => userConnection.connection.send(packet));
}

export function sendToArea(packet: SimplePacket | string, map: Map, x: number, y: number) {
    ConnectionList.forEach(userConnection => {
        if (userConnection.player && (null == map || userConnection.player.map == map)) {
            if (
                userConnection.player.x < (x - halfAreaWidth)
                ||
                userConnection.player.x > (x + halfAreaWidth)
                ||
                userConnection.player.y < (y - halfAreaHeight)
                ||
                userConnection.player.y > (y + halfAreaHeight)
            ) return;

            userConnection.connection.send(packet)
        }
    });
}

export function sendToMap(packet: SimplePacket | string, map: Map) {
    ConnectionList.forEach(userConnection => {
        if (userConnection.player && (null == map || userConnection.player.map == map)) {
            userConnection.connection.send(packet)
        }
    });
}

export function sendTo(packet: SimplePacket | string, filter: (player: Player) => boolean) {
    ConnectionList.forEach(userConnection => {
        if (filter(userConnection.player)) {
            userConnection.connection.send(packet)
        }
    });
}