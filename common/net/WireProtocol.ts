import { EventEmitter } from 'events';
import { PacketCodes } from '../protocol/packets';
import { SimplePacket } from './SimplePacket';

export namespace WireProtocol {
    export class Tape extends EventEmitter {
        static ON_EVERY_CODE = '-1';
        handlePacket(raw: string) {
            let packet = SimplePacket.fromRaw(raw);
            this.emit(Tape.ON_EVERY_CODE, packet.id, packet.data);
            this.emit(packet.id.toString(), packet.data, packet);
        }
        when(packet: PacketCodes, callback: (data: any) => void) {
            this.on(packet.toString(), callback);
            return this;
        }
        onEvery(callback: (packet: PacketCodes, data: any) => void) {
            this.on(Tape.ON_EVERY_CODE, callback);
            return this;
        }
    }

    export class TapeHandler {
        constructor(public tape: Tape) {
            tape.onEvery((packet, data) => {
                if (packet in this.handlers)
                    this.handlers[packet](data);
                else
                    console.error(packet + " NOT IMPLEMENTED!!!!");
            });
        }

        handlers = {}
    }
}