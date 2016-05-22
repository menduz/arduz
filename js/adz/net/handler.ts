import {WireProtocol, Packets} from '../../../common'

import * as map from '../mzengine/map'
import * as chars from '../game/char'
import { send } from './client'
import * as state from '../state';
import lg = require('../ui/loadingGame');
import * as Camera from '../mzengine/camera';

import {chatPromptInstance} from '../ui/dom_chat'

const p = Packets.PacketCodes;

export class Handler extends WireProtocol.TapeHandler {

    constructor(tape) {
        super(tape);

        Camera.observable.on('moveByHead', function (heading, x, y) {
            if (state.playerKey) {
                if (chars.chars[state.playerKey]) {
                    chars.chars[state.playerKey].moveByHead(heading);
                    send(Packets.CLI_Walk({
                        heading: heading
                    }));
                }
            }
        });

        chatPromptInstance.on('chat', (text) => send(Packets.CLI_Talk({
            text
        })))
    }

    handlers = {
        [p.SV_Welcome]: () => {
            send(Packets.CLI_Initialize({}));
        },

        [p.EVT_Disconnected]: () => {
            lg.show();
            state.playerKey = null;
            for (var i in chars.chars) {
                delete chars.chars[i];
            }
        },

        [p.SV_SetMap]: (data: Packets.SV_SetMap) => {
            console.log("Loading map " + data.key);
            map.loadMap(null, function () {
                // avisar al server que cargué el mapa
                lg.hide();
            });
        },

        [p.SV_SetPlayerKey]: (data: Packets.SV_SetPlayerKey) => {
            state.playerKey = data.player;
        },

        [p.SV_MoveChar]: (data: Packets.SV_MoveChar) => {
            var char = chars.chars[data.player];
            if (char) {
                if (!isNaN(data.heading)) {
                    char.moveByHead(data.heading);
                } else {
                    char.setPos(data.x, data.y);
                }
            }
        },

        [p.SV_UpdateChar]: (data: Packets.SV_UpdateChar) => {
            var char = chars.chars[data.key];
            if (!char) {
                char = chars.chars[data.key] = new chars.ClientPlayer();
            }
            char.body.setBody(data.body || 1);
            char.body.setHead(data.head || 1);
            char.body.name = data.nick;
            char.setPos(data.x | 0, data.y | 0);
            char.heading = data.heading | 0;
            char.key = data.key;
            if (data.key == state.playerKey) {
                Camera.setPos(char.x, char.y);
            }
        },

        [p.SV_RemoveChar]: (data: Packets.SV_RemoveChar) => {
            var char = chars.chars[data.player];

            if (char) {
                delete chars.chars[data.player];
            }
        },

        [p.SV_Talk]: (data: Packets.SV_Talk) => {
            var char = chars.chars[data.player];

            if (char) {
                char.setChat(data.text);
            }

            chatPromptInstance.pushMessage(data);
        },

    }
}