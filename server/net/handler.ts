import {WireProtocol, Packets} from '../../common'
import {UserConnection, sendToAll} from './userConnection'
import * as map from '../entities/map'
import {Player} from '../entities/player'

const p = Packets.PacketCodes;

export class Handler extends WireProtocol.TapeHandler {
    constructor(public userConnection: UserConnection) {
        super(userConnection.tape);
        this.userConnection.send(Packets.SV_Welcome({}));
    }

    handlers = {
        [p.CLI_Initialize]: (data) => {
            let player = this.userConnection.player = this.userConnection.player || new Player();

            player.connection = this.userConnection;

            map.LandingMap.addPlayer(player, 0 | (10 * Math.random()), 0 | (10 * Math.random()));

            this.userConnection.send(Packets.SV_SetPlayerKey({
                player: player.key
            }));
            this.userConnection.send(player.NET_createUpdateChar());
        },

        [p.CLI_Walk]: (data: Packets.CLI_Walk) => {
            this.userConnection.player.move(data.heading);
        },

        [p.CLI_Talk]: (data: Packets.CLI_Talk) => {
            sendToAll(Packets.SV_Talk({
                player: this.userConnection.player && this.userConnection.player.key,
                nick: this.userConnection.player && this.userConnection.player.nick,
                text: data.text
            }))
        },

        [p.EVT_Disconnected]: () => {
            if (this.userConnection.player && this.userConnection.player.map)
                this.userConnection.player.map.removePlayer(this.userConnection.player)
            console.log("Disconnected", this.userConnection.player.nick);
        },
    }
}