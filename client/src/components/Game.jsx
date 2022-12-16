import React from "react";
function Game({ onLose }) {
  const [isStarted, setIsStarted] = React.useState(false);
  const [isLose, setIsLose] = React.useState(false);
  const width = React.useRef(null);
  const height = React.useRef(null);
  const enemyCnt = React.useRef(null);
  const fruitsCnt = React.useRef(null);
  const mytable1 = React.useRef(null);
  function Maze() {
    let maze = {
      width: 0,
      height: 0,
      field: [],
      dist: [],
      move: [-1, 0, 1, 0, 0, 1, 0, -1],
      enemiesCnt: 0,
      fruitsCnt: 0,
      enemiesCoords: [],
      score: 0,
      target: null,
      keys: null,
      player: {
        y: 0,
        x: 0,
      },
      init: function () {
        this.width = parseInt(width.current.value);
        this.height = parseInt(height.current.value);
        this.enemiesCnt = parseInt(enemyCnt.current.value);
        this.fruitsCnt = parseInt(fruitsCnt.current.value);
        this.field = [];
        this.dist = [];
        this.score = 0;
        this.enemiesCoords = [];
        for (var j = 0; j < this.height; j++) {
          var row = [],
            row_d = [];
          for (var i = 0; i < this.width; i++) {
            row_d.push(Infinity);
            if (Math.floor(Math.random() * 10) % 3 === 0) row.push(1);
            else row.push(0);
          }
          this.field.push(row);
          this.dist.push(row_d);
        }
        this.player.y = Math.floor(Math.random() * this.height);
        this.player.x = Math.floor(Math.random() * this.width);
        this.field[this.player.y][this.player.x] = 0;
        var i = this.enemiesCnt,
          loops = 10;
        while (i > 0 && loops > 0) {
          loops--;
          var y = Math.floor(Math.random() * this.height);
          var x = Math.floor(Math.random() * this.width);
          if (this.field[y][x] === 0) {
            this.field[y][x] = 2;
            this.enemiesCoords.push(y);
            this.enemiesCoords.push(x);
            loops = 10;
            i--;
          }
        }
        enemyCnt.current.value = this.enemiesCnt - i;
        i = this.fruitsCnt;
        loops = 10;
        while (i > 0 && loops > 0) {
          loops--;
          var y = Math.floor(Math.random() * this.height);
          var x = Math.floor(Math.random() * this.width);
          if (this.field[y][x] === 0) {
            this.field[y][x] = 3;
            //this.enemiesCoords.push(y);
            //this.enemiesCoords.push(x);
            loops = 10;
            i--;
          }
        }
        fruitsCnt.current.value = this.fruitsCnt - i;
        //console.log(this);
      },
      setTarget: function (target, keys) {
        this.target = target;
        this.keys = keys;
      },
      isCoordsCorrect: function (x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
        return true;
      },
      setInf: function () {
        for (var i = 0; i < this.height; i++)
          for (var j = 0; j < this.width; j++) this.dist[i][j] = Infinity;
      },
      redist: function (x, y, d) {
        if (!this.isCoordsCorrect(x, y) || this.field[y][x] === 1) return;
        if (d >= this.dist[y][x]) return;
        this.dist[y][x] = d;
        for (var i = 0; i < 8; i += 2)
          this.redist(x + this.move[i], y + this.move[i + 1], d + 1);
      },
      draw: function () {
        this.setInf();
        this.redist(this.player.x, this.player.y, 0);
        var table = this.target;
        table.innerHTML = "";
        var headTr = document.createElement("tr");
        var headTd = document.createElement("td");
        headTd.setAttribute("colspan", this.width);
        headTd.innerHTML = `Очков ${this.score}`;
        headTd.style = "text-align: center";
        headTr.appendChild(headTd);
        table.appendChild(headTr);
        for (var j = 0; j < this.height; j++) {
          var tr = document.createElement("tr");
          for (var i = 0; i < this.width; i++) {
            var td = document.createElement("td");
            if (this.field[j][i] === 1) td.className = "wall";
            if (this.field[j][i] === 2) td.className = "enemy";
            if (this.field[j][i] === 3) td.className = "fruit";
            if (this.player.y === j && this.player.x === i) {
              td.className = "player";
            }
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
      },
      keyboard: function (e) {
        var redraw = false;
        if (
          e.code === this.keys[3] &&
          this.player.x < this.width - 1 &&
          (this.field[this.player.y][this.player.x + 1] === 0 ||
            this.field[this.player.y][this.player.x + 1] === 3)
        ) {
          this.player.x++;
          redraw = true;
        }
        if (
          e.code === this.keys[1] &&
          this.player.x > 0 &&
          (this.field[this.player.y][this.player.x - 1] === 0 ||
            this.field[this.player.y][this.player.x - 1] === 3)
        ) {
          this.player.x--;
          redraw = true;
        }
        if (
          e.code === this.keys[0] &&
          this.player.y > 0 &&
          (this.field[this.player.y - 1][this.player.x] === 0 ||
            this.field[this.player.y - 1][this.player.x] === 3)
        ) {
          this.player.y--;
          redraw = true;
        }
        if (
          e.code === this.keys[2] &&
          this.player.y < this.height - 1 &&
          (this.field[this.player.y + 1][this.player.x] === 0 ||
            this.field[this.player.y + 1][this.player.x] === 3)
        ) {
          this.player.y++;
          redraw = true;
        }
        if (redraw) {
          if (this.field[this.player.y][this.player.x] === 3) {
            this.score++;
            this.field[this.player.y][this.player.x] = 0;
            this.fruitsCnt--;
          }
          this.draw();
        }
      },
      lose: function () {
        onLose(this.score);
        stop();
        setIsLose(true);
      },
      isLose: function () {
        for (var i = 0; i < 2 * this.enemiesCnt; i += 2) {
          if (
            this.player.y === this.enemiesCoords[i] &&
            this.player.x === this.enemiesCoords[i + 1]
          )
            return true;
        }
        return false;
      },
      step: function () {
        var lose = false;
        for (var i = 0; i < 2 * this.enemiesCnt; i += 2) {
          var y = this.enemiesCoords[i],
            x = this.enemiesCoords[i + 1];
          for (var j = 0; j < 8; j += 2) {
            var mx = this.move[j],
              my = this.move[j + 1];
            if (
              this.isCoordsCorrect(mx + x, my + y) &&
              this.dist[y + my][x + mx] < this.dist[y][x] &&
              (this.field[my + y][mx + x] === 3 ||
                this.field[my + y][mx + x] === 0)
            ) {
              this.field[y][x] = 0;
              this.field[y + my][x + mx] = 2;
              this.enemiesCoords[i] += my;
              this.enemiesCoords[i + 1] += mx;
              break;
            }
          }
        }
        this.draw();
        if (this.isLose()) this.lose();
      },
    };
    return maze;
  }

  var maze1 = Maze();

  var interval_id1 = React.useRef(null);

  function stop() {
    clearInterval(interval_id1.current);
    setIsStarted(false);
  }
  const start = React.useCallback(() => {
    stop();
    maze1.setTarget(mytable1.current, ["KeyW", "KeyA", "KeyS", "KeyD"]);
    interval_id1.current = setInterval(maze1.step.bind(maze1), 1000);
    maze1.init();
    maze1.draw();
    setIsStarted(true);
    setIsLose(false);
  }, []);

  React.useEffect(() => {
    function onKeyDown(e) {
      maze1.keyboard(e);
    }
    document.body.onkeydown = onKeyDown;
    return () => {
      document.body.onkeydown = null;
    };
  }, []);
  return (
    <div className="w-100 bg-white rounded-3 p-4">
      <h4>Игра</h4>
      <div className="my-2">
        <label className="me-2">Ширина:</label>
        <input
          id="width"
          className="rounded-2 border-0 grey-200 px-2"
          placeholder="Ширина поля"
          ref={width}
          type="number"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Высота:</label>
        <input
          id="height"
          ref={height}
          type="number"
          placeholder="Высота поля"
          className="rounded-2 border-0 grey-200 px-2"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Количество противников:</label>
        <input
          id="enemyCnt"
          ref={enemyCnt}
          type="number"
          placeholder="Кол-во противников"
          className="rounded-2 border-0 grey-200 px-2"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Количество фруктов:</label>
        <input
          id="fruitsCnt"
          ref={fruitsCnt}
          type="number"
          placeholder="Кол-во фруктов"
          className="rounded-2 border-0 grey-200 px-2"
        />
      </div>
      <div className="mt-2">
        {isStarted ? (
          <input
            type="button"
            className="btn btn-danger mb-2"
            onClick={() => stop()}
            value="Остановить игру"
          />
        ) : (
          <input
            type="button"
            className="btn btn-primary me-2 mb-2"
            onClick={() => {
              start();
            }}
            value="Начать игру"
          />
        )}
      </div>
      <div className="rounded-3 border border-2 rounded-4 d-inline-block ">
        <table
          ref={mytable1}
          id="mytable1"
          cellPadding="5px"
          cellSpacing="0px"
        ></table>
        {isLose && (
          <div className="lose my-2 ms-2 text-danger">
            <p className="p-0 m-0">Вы проиграли</p>{" "}
            <p className="p-0 m-0">Начните игру заново</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Game;
