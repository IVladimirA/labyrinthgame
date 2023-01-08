class Maze {

    constructor(width, height, enemyCnt = 0, fruitCnt = 0) {
        this.width = width;
        this.height = height;
        this.field = [];
        this.enemyCnt = enemyCnt;
        this.fruitCnt = fruitCnt;
        this.init();
    }

    init() {
        for (let i = 0; i < this.height; ++i) {
            let row = [];
            for (let j = 0; j < this.width; ++j)
                row.push('W');
            this.field.push(row);
        }

        let x = Math.floor(Math.random() * this.width);
        let y = Math.floor(Math.random() * this.height);
        this.dig(x, y);
    }

    dig(i, j) {
        this.field[i][j] = '.';
        let steps = this.get_jump(i, j);
        while (steps.length > 0) {
            let step = steps[Math.floor(Math.random() * steps.length)];
            this.field[(i + step[0]) / 2][(j + step[1]) / 2] = '.';
            this.dig(step[0], step[1]);
            steps = this.get_jump(i, j);
        }
    }

    get_jump(i, j) {
        let res = [];
        if (i - 2 >= 0 && this.field[i - 2][j] === 'W') res.push([i - 2, j]);
        if (j - 2 >= 0 && this.field[i][j - 2] === 'W') res.push([i, j - 2]);
        if (i + 2 < this.height && this.field[i + 2][j] === 'W') res.push([i + 2, j]);
        if (j + 2 < this.width && this.field[i][j + 2] === 'W') res.push([i, j + 2]);
        return res;
    }
}
