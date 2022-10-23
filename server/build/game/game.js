"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDirection = void 0;
var GameDirection;
(function (GameDirection) {
    GameDirection["UP"] = "up";
    GameDirection["RIGHT"] = "right";
    GameDirection["DOWN"] = "down";
    GameDirection["LEFT"] = "left";
})(GameDirection = exports.GameDirection || (exports.GameDirection = {}));
class Game {
    constructor(map, player) {
        this.map = map;
        this.player = player;
        this.playerPosition = map.startCell;
    }
    playerMove(direction) {
        const newPosition = this.playerPosition;
        switch (direction) {
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
exports.default = Game;
