import * as enums from '../common/enums';
import {Map} from './map';
import {UserConnection} from './userConnection';

export class Player {
    map: Map;
    
    connection: UserConnection;
    
    x: number;
    y: number;

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

    move(heading: enums.Heading) {
        if(this.map.canUserMove(this.x, this.y, heading)){
            
        }
    }
} 