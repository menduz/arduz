import {PacketCodes} from './packets';

export class SimplePacket {
    constructor(public id: number, public data: any) {

    }

    serialize() {
        let raw = JSON.stringify({
            id: this.id,
            data: this.data
        });
        return raw;
    }

    static fromRaw(raw: any) {
        try {
            var parsed = JSON.parse(raw);

            if (parsed.id) {
                console.log('<<' + PacketCodes[parsed.id] + ': ' + JSON.stringify(parsed.data));
                return new SimplePacket(parsed.id, parsed.data);
            } else throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw));
        } catch (e) {
            console.error("ERROR PARSING MESSAGE", e, raw);
            throw new TypeError("Message doesn't contains 'id': " + JSON.stringify(raw))
        }
    }
}