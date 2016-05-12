import { EventEmitter } from 'events';
import { PacketCodes } from './packets';
import { SimplePacket } from './packet';

export namespace WireProtocol {
    export class Tape extends EventEmitter {
        handlePacket(raw: string) {
            let packet = SimplePacket.fromRaw(raw);
            this.emit(packet.id.toString(), packet.data, packet);
        }
    }
}