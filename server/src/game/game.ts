import CellCoordinate from './cell-coordinate'
import GameMap from './game-map'
import Player from './player'

export enum GameDirection {
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left'
}

export default class Game {
    private playerPosition: CellCoordinate;

    constructor(private map: GameMap, private player: Player) {
        this.playerPosition = map.startCell;
    }

    public playerMove(direction: GameDirection) {
        const newPosition: CellCoordinate = this.playerPosition;
        switch(direction) {
            case GameDirection.UP:
                newPosition.row--;
                break;
            case GameDirection.RIGHT:
                newPosition.column++;
                break;
            case GameDirection.DOWN:
                newPosition.row++;
                break;
            case GameDirection.LEFT:
                newPosition.column--;
                break;
        }
        if (this.map.isCellFree(newPosition)) {
            this.playerPosition = newPosition;
        }
    }
}
