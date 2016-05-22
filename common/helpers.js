"use strict";
var enums = require('./enums');
function headToPos(x, y, heading) {
    switch (heading) {
        case enums.Heading.East:
            return {
                x: x + 1,
                y: y
            };
        case enums.Heading.West:
            return {
                x: x - 1,
                y: y
            };
        case enums.Heading.North:
            return {
                x: x,
                y: y - 1
            };
        case enums.Heading.South:
            return {
                x: x,
                y: y + 1
            };
    }
    return {
        x: x,
        y: y
    };
}
exports.headToPos = headToPos;
