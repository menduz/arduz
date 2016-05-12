import {Player} from './player'
import * as enums from '../common/enums';

export class MapBlock {
    blocked = false;
    players: Player;
}

export class Map {
    blocks: MapBlock[][] = [];

    constructor(public size = 255) {

        this.blocks = [];

        for (var x = 0; x < size; x++) {
            var row = [];
            this.blocks.push(row);
            for (var y = 0; y < size; y++) {
                row.push(new MapBlock);
            }
        }
    }

    canUserMove(x: number, y: number, heading: enums.Heading){
        return true;
    }
}