import { SimplePacket } from '../net/SimplePacket';

export enum PacketCodes {
    // Client messages
    CLI_Login,
    CLI_Initialize,
    CLI_Relogin,
    CLI_Logout,
    CLI_UseItem,
    CLI_Walk,
    CLI_Talk,
    CLI_SetHeading,

    // Server messages
    EVT_Disconnected,
    EVT_Connected,

    SV_Welcome,

    SV_UpdateChar,
    SV_MoveChar,

    SV_SetMap,
    SV_InventorySet,
    SV_UpdateStats,
    SV_SetUserText,
    SV_SetPlayerKey,
    SV_SetHeading,
    SV_RemoveChar,
    SV_Talk
}

function createPacket(packet: PacketCodes, data) {
    return new SimplePacket(packet, data);
}

// INTERFACES -----------------------------------------

export interface SV_UpdateChar {
    key: string,
    x: number,
    y: number,
    head: number,
    body: number,
    helmet: number,
    weapon: number,
    nick: string,
    shield: number,
    color: string,
    heading: number
}
export const SV_UpdateChar = (data: SV_UpdateChar) => createPacket(PacketCodes.SV_UpdateChar, data);

/// ---

export interface SV_SetMap {
    key: string
}
export const SV_SetMap = (data: SV_SetMap) => createPacket(PacketCodes.SV_SetMap, data);

/// ---

export interface SV_SetHeading {
    player: string,
    heading: number
}
export const SV_SetHeading = (data: SV_SetHeading) => createPacket(PacketCodes.SV_SetHeading, data);

/// ---

export interface CLI_SetHeading {
    heading: number
}
export const CLI_SetHeading = (data: CLI_SetHeading) => createPacket(PacketCodes.CLI_SetHeading, data);

/// ---

export interface SV_RemoveChar {
    player: string,
    map: string
}
export const SV_RemoveChar = (data: SV_RemoveChar) => createPacket(PacketCodes.SV_RemoveChar, data);

/// ---

export interface SV_MoveChar {
    player: string,
    x: number,
    y: number,
    heading?: number
}
export const SV_MoveChar = (data: SV_MoveChar) => createPacket(PacketCodes.SV_MoveChar, data);

/// ---

export interface SV_Welcome {

}
export const SV_Welcome = (data: SV_Welcome) => createPacket(PacketCodes.SV_Welcome, data);

/// ---

export interface SV_SetPlayerKey {
    player: string
}
export const SV_SetPlayerKey = (data: SV_SetPlayerKey) => createPacket(PacketCodes.SV_SetPlayerKey, data);


/// ---

export interface CLI_Walk {
    heading: number
}
export const CLI_Walk = (data: CLI_Walk) => createPacket(PacketCodes.CLI_Walk, data);

/// ---

export interface CLI_Initialize {
   
}
export const CLI_Initialize = (data: CLI_Initialize) => createPacket(PacketCodes.CLI_Initialize, data);

/// ---

export interface CLI_Talk {
    text: string;
}
export const CLI_Talk = (data: CLI_Talk) => createPacket(PacketCodes.CLI_Talk, data);
/// ---

export interface SV_Talk {
    player: string;
    text: string;
    nick: string;
}
export const SV_Talk = (data: SV_Talk) => createPacket(PacketCodes.SV_Talk, data);
