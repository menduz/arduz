export enum PacketCodes {
    // Client messages
    Disconnected = 0,
    Connected = -1,
    Login = 1,
    Logout = 2,
    UseItem = 3,
    Walk = 4,
    Talk = 5,

    // Server messages
    UpdateChar = 100,
    MoveChar = 101,
    SetMap = 102,
    InventorySet = 103,
    UpdateStats = 104,
    SetUserText = 105
}