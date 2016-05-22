import { Player } from './player'
import { Enums, Packets } from '../../common'
import * as conn from '../net/userConnection'


export class MapBlock {
    blocked = false;
    item;
}

export class Map {
    key: string;

    blocks: MapBlock[][] = [];

    players: mz.Dictionary<Player> = {};

    constructor(public size = 255) {
        this.key = "base-map";
        this.blocks = [];

        MapDictionary[this.key] = this;

        for (var x = 0; x < size; x++) {
            var row = [];
            this.blocks.push(row);
            for (var y = 0; y < size; y++) {
                row.push(new MapBlock);
            }
        }
    }

    canUserMove(x: number, y: number, heading: Enums.Heading) {
        return true;
    }

    addPlayer(player: Player, x: number, y: number) {
        player.connection.send(Packets.SV_SetMap({
            key: this.key
        }));

        this.players[player.key] = player;

        player.map = this;

        conn.sendToMap(player.NET_createUpdateChar(), this);

        for (var p in this.players) {
            if (this.players[p] !== player) {
                player.connection.send(this.players[p].NET_createUpdateChar());
            }
        }
    }

    removePlayer(player: Player) {
        delete this.players[player.key];
        this.removeFromTile(player);
        conn.sendToMap(Packets.SV_RemoveChar({ player: player.key, map: this.key }), this);
    }

    private removeFromTile(player: Player) {

    }
}

export var MapDictionary: mz.Dictionary<Map> = {};

export var LandingMap = new Map;