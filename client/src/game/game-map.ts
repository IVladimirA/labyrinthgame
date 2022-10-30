import CellCoordinate from './cell-coordinate'

enum CellType {
    EMPTY = 0,
    OBSTACLE = 1
}

class Cell {
    constructor (public type = CellType.EMPTY) {}
}

class CellLayout {
    public cells: Cell[][] = [];
    constructor (mapLayout: CellType[][] = []) {
        CellLayout.LayoutToCells(mapLayout);
    }
    private static LayoutToCells(mapLayout: CellType[][] = []) {
        const cells: Cell[][] = [];
        for (const row of mapLayout) {
            const currentRow: Cell[] = [];
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

export default class GameMap {
    constructor(public cells: CellLayout, public startCell: CellCoordinate) {}
    public isCellFree(coordinate: CellCoordinate): boolean {
        if (coordinate.column < 0 || coordinate.row < 0 ||
            coordinate.column >= this.cells.cells[0].length || coordinate.row >= this.cells.cells.length) {
                return false;
            }
        return this.cells.cells[coordinate.row][coordinate.column].type == 0;
    }
}
