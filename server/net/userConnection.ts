import { SimplePacket, WireProtocol, Packets } from '../../common';
import { Player } from '../entities/player';
import { Map } from '../entities/map';
import * as WebSocket from 'ws';

const areaWidth = 16;
const areaHeight = 12;

const halfAreaWidth = Math.floor(areaWidth / 2) + 1;
const halfAreaHeight = Math.floor(areaHeight / 2) + 1;

export var ConnectionList: UserConnection[] = [];

export class UserConnection {
    player: Player = null;

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

    sendToMap(packet: SimplePacket, includeMyself = true) {
        if (!this.player || !this.player.map) return;

        sendToMap(packet, this.player.map, includeMyself ? null : this.player);
    }

    send(packet: SimplePacket) {
        console.log('<<' + Packets.PacketCodes[packet.id] + ":", JSON.stringify(packet.data));
        this.connection.send(packet.serialize());
    }



    private WS_HandleError(error: number) {
        console.log('Connection closed.');

        let index = ConnectionList.indexOf(this);
        if (index != -1) {
            ConnectionList.splice(index, 1);
        }
        
        this.tape.emit(WireProtocol.Tape.ON_EVERY_CODE, Packets.PacketCodes.EVT_Disconnected, {});
        this.tape.emit(Packets.PacketCodes.EVT_Disconnected.toString());

        console.log('\tActive connections: ' + ConnectionList.length);
    }

    private WS_HandleMessage(data: any, flags) {
        try {
            this.tape.handlePacket(data);
        } catch (e) {
            console.trace(e);
            this.close();
        }
    }

    constructor(public connection: WebSocket) {
        console.log('Connection opened.');

        connection.on('close', this.WS_HandleError.bind(this));
        connection.on('message', this.WS_HandleMessage.bind(this));

        connection.on('error', console.trace.bind(console));

        ConnectionList.push(this);

        console.log('\tActive connections: ' + ConnectionList.length);

        setImmediate(() =>
            this.tape.emit(Packets.PacketCodes.EVT_Connected.toString())
        );
    }

    close() {
        console.log('Closing connection...');
        this.connection.close();
    }
}

export function sendToAll(packet: SimplePacket, excludePlayer: Player = null) {
    ConnectionList.forEach(userConnection => {
        if (null == excludePlayer || excludePlayer != userConnection.player)
            userConnection.send(packet);
    });
}

export function sendToArea(packet: SimplePacket, map: Map, x: number, y: number) {
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

            userConnection.send(packet)
        }
    });
}

export function sendToMap(packet: SimplePacket, map: Map, excludePlayer: Player = null) {
    ConnectionList.forEach(userConnection => {
        if (
            userConnection.player
            && (null == map || userConnection.player.map == map)
            && (null == excludePlayer || excludePlayer != userConnection.player)
        ) {
            userConnection.send(packet)
        }
    });
}

export function sendTo(packet: SimplePacket, filter: (player: Player) => boolean) {
    ConnectionList.forEach(userConnection => {
        if (filter(userConnection.player)) {
            userConnection.send(packet)
        }
    });
}