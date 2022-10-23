"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CellType;
(function (CellType) {
    CellType[CellType["EMPTY"] = 0] = "EMPTY";
    CellType[CellType["OBSTACLE"] = 1] = "OBSTACLE";
})(CellType || (CellType = {}));
class Cell {
    constructor(type = CellType.EMPTY) {
        this.type = type;
    }
}
class CellLayout {
    constructor(mapLayout = []) {
        this.cells = [];
        CellLayout.LayoutToCells(mapLayout);
    }
    static LayoutToCells(mapLayout = []) {
        const cells = [];
        for (const row of mapLayout) {
            const currentRow = [];
            for (const cellType of row) {
                switch (cellType) {
                    case CellType.OBSTACLE:
                        currentRow.push(new Cell(1));
                        break;
                    case CellType.EMPTY:
                    default:
                        currentRow.push(new Cell(0));
                        break;
                }
            }
            cells.push(currentRow);
        }
        return cells;
    }
}
class GameMap {
    constructor(cells, startCell) {
        this.cells = cells;
        this.startCell = startCell;
    }
    isCellFree(coordinate) {
        if (coordinate.column < 0 || coordinate.row < 0 ||
            coordinate.column >= this.cells.cells[0].length || coordinate.row >= this.cells.cells.length) {
            return false;
        }
        return this.cells.cells[coordinate.row][coordinate.column].type == 0;
    }
}
exports.default = GameMap;
