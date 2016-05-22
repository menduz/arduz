import * as enums from './enums';

export function headToPos(x: number, y: number, heading: enums.Heading): { x: number; y: number } {
    switch (heading) {
        case enums.Heading.East:
            return {
                x: x + 1,
                y: y
            }
        case enums.Heading.West:
            return {
                x: x - 1,
                y: y
            }
        case enums.Heading.North:
            return {
                x: x,
                y: y - 1
            }
        case enums.Heading.South:
            return {
                x: x,
                y: y + 1
            }
    }

    return {
        x,
        y
    }
} 