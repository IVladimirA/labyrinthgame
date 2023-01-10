export class Maze {

    constructor(width, height, enemyCnt = 0, fruitCnt = 0) {
        this.width = width;
        this.height = height;
        this.field = [];
        this.playerCoords = [];
        this.enemyCnt = enemyCnt;
        this.enemies = [];
        this.fruitCnt = fruitCnt;
        this.fruits = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.height; ++i) {
            let row = [];
            for (let j = 0; j < this.width; ++j)
                row.push('W');
            this.field.push(row);
        }

        let y = Math.floor(Math.random() * this.height);
        let x = Math.floor(Math.random() * this.width);
        this.dig(x, y);

        while (this.playerCoords.length === 0) {
            y = Math.floor(Math.random() * this.height);
            x = Math.floor(Math.random() * this.width);
            if (this.field[y][x] === '.') {
                this.field[y][x] = 'P';
                this.playerCoords.push(y);
                this.playerCoords.push(x);
            }
        }

        while (this.fruits.length < this.fruitCnt) {
            y = Math.floor(Math.random() * this.height);
            x = Math.floor(Math.random() * this.width);
            if (this.field[y][x] === '.') {
                this.field[y][x] = 'F';
                this.fruits.push([y, x]);
            }
        }

        while (this.enemies.length < this.enemyCnt) {
            y = Math.floor(Math.random() * this.height);
            x = Math.floor(Math.random() * this.width);
            if (this.field[y][x] === '.') {
                this.field[y][x] = 'E';
                this.enemies.push([y, x]);
            }
        }
    }

    dig(i, j) {
        this.field[i][j] = '.';
        let steps = this.getJump(i, j);
        while (steps.length > 0) {
            let step = steps[Math.floor(Math.random() * steps.length)];
            this.field[(i + step[0]) / 2][(j + step[1]) / 2] = '.';
            this.dig(step[0], step[1]);
            steps = this.getJump(i, j);
        }
    }

    getJump(i, j) {
        let res = [];
        if (i - 2 >= 0 && this.field[i - 2][j] === 'W') res.push([i - 2, j]);
        if (j - 2 >= 0 && this.field[i][j - 2] === 'W') res.push([i, j - 2]);
        if (i + 2 < this.height && this.field[i + 2][j] === 'W') res.push([i + 2, j]);
        if (j + 2 < this.width && this.field[i][j + 2] === 'W') res.push([i, j + 2]);
        return res;
    }
}
