import {Map} from './map'
import {UserConnection} from '../net/userConnection'
import { Packets, Helpers, Enums } from '../../common'


export class Player {
    key: string = (Math.random() * 1000000).toString(16);

    map: Map;

    connection: UserConnection;

    x: number = 1;
    y: number = 3;

    inventory: any[];


    intervals = {
        useItem: 1000,
        castSpell: 1000
    }

    lastTimers = {
        spell: 0,
        attack: 0,
        use: 0
    }

    minHp: number;
    maxHp: number;

    minMana: number;
    maxMana: number;

    head: number = (Math.random() * 5) | 0;
    body: number = (Math.random() * 5) | 0;
    helmet: number = (Math.random() * 5) | 0;
    weapon: number = (Math.random() * 5) | 0;
    nick: string = this.key;
    shield: number;
    color: string;

    heading: Enums.Heading = Enums.Heading.South;


    move(heading: Enums.Heading) {
        if (this.map.canUserMove(this.x, this.y, heading)) {
            let newPos = Helpers.headToPos(this.x, this.y, heading);
            this.x = newPos.x;
            this.y = newPos.y;
            this.connection.sendToAllButMe(Packets.SV_MoveChar({
                heading,
                x: newPos.x,
                y: newPos.y,
                player: this.key
            }));
        }
    }

    NET_createUpdateChar() {
        return Packets.SV_UpdateChar({
            key: this.key,
            x: this.x,
            y: this.y,
            head: this.head,
            body: this.body,
            helmet: this.helmet,
            weapon: this.weapon,
            nick: this.nick,
            shield: this.shield,
            color: this.color,
            heading: this.heading
        });
    }
} 