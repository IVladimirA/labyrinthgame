import {Maze} from "./Maze.js";

class Game {

    constructor(width, height, enemyCnt, fruitCnt) {
        this.maze = new Maze(width, height, enemyCnt, fruitCnt);
        this.points = 0;
        this.isGameOver = false;
    }

    player_step(direction) {
        let steps = {
            "up": [-1, 0],
            "down": [1, 0],
            "left": [0, -1],
            "right": [0, 1]
        }
        let dy = steps[direction][0];
        let dx = steps[direction][1];
        let cell = this.maze.field[this.maze.player_coords[0] + dy][this.maze.player_coords[1] + dx];
        if (cell !== 'W') {
            this.maze.field[this.maze.player_coords[0]][this.maze.player_coords[1]] = '.';
            this.maze.player_coords[0] += dy;
            this.maze.player_coords[1] += dx;
            if (cell === 'F')
                ++this.points;
            else if (cell === 'E')
                this.isGameOver = true;
            this.maze.field[this.maze.player_coords[0]][this.maze.player_coords[1]] = 'P';
        }
    }

    enemies_step() {
        let field = [];
        for (let i = 0; i < this.maze.height; ++i)
            field.push(this.maze.field[i].slice());
        field = this.get_info(field, this.maze.player_coords[0], this.maze.player_coords[1], 0);
        for (let enemy of this.maze.enemies) {
            let min_dist = null;
            let min_y = null;
            let min_x = null;
            let i = enemy[0];
            let j = enemy[1];
            if (i - 1 >= 0 && field[i - 1][j] !== 'W' && this.maze.field[i - 1][j] !== 'E')
                if (min_dist === null || field[i - 1][j] < min_dist) {
                    min_dist = field[i - 1][j];
                    min_y = i - 1;
                    min_x = j;
                }
            if (j - 1 >= 0 && field[i][j - 1] !== 'W' && this.maze.field[i][j - 1] !== 'E')
                if (min_dist === null || field[i][j - 1] < min_dist) {
                    min_dist = field[i][j - 1];
                    min_y = i;
                    min_x = j - 1;
                }
            if (i + 1 < this.maze.height && field[i + 1][j] !== 'W' && this.maze.field[i + 1][j] !== 'E')
                if (min_dist === null || field[i + 1][j] < min_dist) {
                    min_dist = field[i + 1][j];
                    min_y = i + 1;
                    min_x = j;
                }
            if (j + 1 < this.maze.width && field[i][j + 1] !== 'W' && this.maze.field[i][j + 1] !== 'E')
                if (min_dist === null || field[i][j + 1] < min_dist) {
                    min_dist = field[i][j + 1];
                    min_y = i;
                    min_x = j + 1;
                }
            if (this.maze.field[min_y][min_x] === 'P')
                this.isGameOver= true;
            this.maze.field[min_y][min_x] = 'E';
            this.maze.field[i][j] = '.';
        }
    }

    get_info(field, i, j, k) {
        field[i][j] = k;
        let cells = ['.', 'E', 'F'];
        if (i - 1 >= 0 && cells.includes(field[i - 1][j]))
            field = this.get_info(field, i - 1, j, k + 1);
        if (j - 1 >= 0 && cells.includes(field[i][j - 1]))
            field = this.get_info(field, i, j - 1, k + 1);
        if (i + 1 < this.maze.height && cells.includes(field[i + 1][j]))
            field = this.get_info(field, i + 1, j, k + 1);
        if (j + 1 < this.maze.width && cells.includes(field[i][j + 1]))
            field = this.get_info(field, i, j + 1, k + 1);
        return field;
    }
}
