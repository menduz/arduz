"use strict";
(function (PacketCodes) {
    // Client messages
    PacketCodes[PacketCodes["Disconnected"] = 0] = "Disconnected";
    PacketCodes[PacketCodes["Connected"] = -1] = "Connected";
    PacketCodes[PacketCodes["Login"] = 1] = "Login";
    PacketCodes[PacketCodes["Logout"] = 2] = "Logout";
    PacketCodes[PacketCodes["UseItem"] = 3] = "UseItem";
    PacketCodes[PacketCodes["Walk"] = 4] = "Walk";
    PacketCodes[PacketCodes["Talk"] = 5] = "Talk";
    // Server messages
    PacketCodes[PacketCodes["UpdateChar"] = 100] = "UpdateChar";
    PacketCodes[PacketCodes["MoveChar"] = 101] = "MoveChar";
    PacketCodes[PacketCodes["SetMap"] = 102] = "SetMap";
    PacketCodes[PacketCodes["InventorySet"] = 103] = "InventorySet";
    PacketCodes[PacketCodes["UpdateStats"] = 104] = "UpdateStats";
    PacketCodes[PacketCodes["SetUserText"] = 105] = "SetUserText";
})(exports.PacketCodes || (exports.PacketCodes = {}));
var PacketCodes = exports.PacketCodes;
