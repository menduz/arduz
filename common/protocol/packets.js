"use strict";
var SimplePacket_1 = require('../net/SimplePacket');
(function (PacketCodes) {
    // Client messages
    PacketCodes[PacketCodes["CLI_Login"] = 0] = "CLI_Login";
    PacketCodes[PacketCodes["CLI_Initialize"] = 1] = "CLI_Initialize";
    PacketCodes[PacketCodes["CLI_Relogin"] = 2] = "CLI_Relogin";
    PacketCodes[PacketCodes["CLI_Logout"] = 3] = "CLI_Logout";
    PacketCodes[PacketCodes["CLI_UseItem"] = 4] = "CLI_UseItem";
    PacketCodes[PacketCodes["CLI_Walk"] = 5] = "CLI_Walk";
    PacketCodes[PacketCodes["CLI_Talk"] = 6] = "CLI_Talk";
    PacketCodes[PacketCodes["CLI_SetHeading"] = 7] = "CLI_SetHeading";
    // Server messages
    PacketCodes[PacketCodes["EVT_Disconnected"] = 8] = "EVT_Disconnected";
    PacketCodes[PacketCodes["EVT_Connected"] = 9] = "EVT_Connected";
    PacketCodes[PacketCodes["SV_Welcome"] = 10] = "SV_Welcome";
    PacketCodes[PacketCodes["SV_UpdateChar"] = 11] = "SV_UpdateChar";
    PacketCodes[PacketCodes["SV_MoveChar"] = 12] = "SV_MoveChar";
    PacketCodes[PacketCodes["SV_SetMap"] = 13] = "SV_SetMap";
    PacketCodes[PacketCodes["SV_InventorySet"] = 14] = "SV_InventorySet";
    PacketCodes[PacketCodes["SV_UpdateStats"] = 15] = "SV_UpdateStats";
    PacketCodes[PacketCodes["SV_SetUserText"] = 16] = "SV_SetUserText";
    PacketCodes[PacketCodes["SV_SetPlayerKey"] = 17] = "SV_SetPlayerKey";
    PacketCodes[PacketCodes["SV_SetHeading"] = 18] = "SV_SetHeading";
    PacketCodes[PacketCodes["SV_RemoveChar"] = 19] = "SV_RemoveChar";
    PacketCodes[PacketCodes["SV_Talk"] = 20] = "SV_Talk";
})(exports.PacketCodes || (exports.PacketCodes = {}));
var PacketCodes = exports.PacketCodes;
function createPacket(packet, data) {
    return new SimplePacket_1.SimplePacket(packet, data);
}
exports.SV_UpdateChar = function (data) { return createPacket(PacketCodes.SV_UpdateChar, data); };
exports.SV_SetMap = function (data) { return createPacket(PacketCodes.SV_SetMap, data); };
exports.SV_SetHeading = function (data) { return createPacket(PacketCodes.SV_SetHeading, data); };
exports.CLI_SetHeading = function (data) { return createPacket(PacketCodes.CLI_SetHeading, data); };
exports.SV_RemoveChar = function (data) { return createPacket(PacketCodes.SV_RemoveChar, data); };
exports.SV_MoveChar = function (data) { return createPacket(PacketCodes.SV_MoveChar, data); };
exports.SV_Welcome = function (data) { return createPacket(PacketCodes.SV_Welcome, data); };
exports.SV_SetPlayerKey = function (data) { return createPacket(PacketCodes.SV_SetPlayerKey, data); };
exports.CLI_Walk = function (data) { return createPacket(PacketCodes.CLI_Walk, data); };
exports.CLI_Initialize = function (data) { return createPacket(PacketCodes.CLI_Initialize, data); };
exports.CLI_Talk = function (data) { return createPacket(PacketCodes.CLI_Talk, data); };
exports.SV_Talk = function (data) { return createPacket(PacketCodes.SV_Talk, data); };
