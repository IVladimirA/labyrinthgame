import React from "react";
import { Game as gameClass } from "./Game.js";
import { ButtonGroup, Button } from "react-bootstrap";
import baseWall from "../assets/base/block.png";
import baseEnemie from "../assets/base/enemie.png";
import baseFruit from "../assets/base/fruit.gif";
import basePlayer from "../assets/base/player.png";
import helloweenWall from "../assets/helloween/block.png";
import helloweenEnemie from "../assets/helloween/enemie.png";
import helloweenFruit from "../assets/helloween/fruit.gif";
import helloweenPlayer from "../assets/helloween/player.png";
import newYearWall from "../assets/new_year/block.png";
import newYearEnemie from "../assets/new_year/enemie.webp";
import newYearFruit from "../assets/new_year/fruit.gif";
import newYearPlayer from "../assets/new_year/player.png";
import spaceWall from "../assets/space/block.jpg";
import spaceEnemie from "../assets/space/enemie.png";
import spaceFruit from "../assets/space/fruit.gif";
import spacePlayer from "../assets/space/player.png";
const directions = [
  {
    name: "up",
    key: "KeyW",
  },
  {
    name: "down",
    key: "KeyS",
  },
  {
    name: "left",
    key: "KeyA",
  },
  {
    name: "right",
    key: "KeyD",
  },
];
const themes = [
  {
    name: "Основная",
    id: 0,
    wall: baseWall,
    enemie: baseEnemie,
    player: basePlayer,
    fruit: baseFruit,
  },
  {
    name: "Хеллоуин",
    id: 1,
    wall: helloweenWall,
    enemie: helloweenEnemie,
    player: helloweenPlayer,
    fruit: helloweenFruit,
  },
  {
    name: "Новый год",
    id: 2,
    wall: newYearWall,
    enemie: newYearEnemie,
    player: newYearPlayer,
    fruit: newYearFruit,
  },
  {
    name: "Космос",
    id: 3,
    wall: spaceWall,
    enemie: spaceEnemie,
    player: spacePlayer,
    fruit: spaceFruit,
  },
];
function Game({ onLose }) {
  const [isStarted, setIsStarted] = React.useState(false);
  const [isLose, setIsLose] = React.useState(false);
  const [width, setWidth] = React.useState(10);
  const [height, setHeight] = React.useState(10);
  const [enemyCnt, setEnemyCnt] = React.useState(2);
  const [fruitsCnt, setFruitsCnt] = React.useState(2);
  const [table, setTable] = React.useState(null);
  const [game, setGame] = React.useState(null);
  const [themeId, setThemeId] = React.useState(0);
  const tableContainer = React.useRef(null);
  const interval = React.useRef(null);
  React.useEffect(() => {
    function onKeydown(e) {
      if (!game) return;
      directions.forEach((direction) => {
        if (e.code === direction.key) {
          game.playerStep(direction.name);
          setTable(drawTable(game.maze.field));
        }
      });
    }
    document.addEventListener("keydown", onKeydown);
    interval.current = setInterval(() => {
      if (!game) return;
      game.enemiesStep();
      setTable(drawTable(game.maze.field));
      if (game.isGameOver) {
        lose();
      }
    }, 1000);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [game]);
  function start() {
    const game = new gameClass(width, height, enemyCnt, fruitsCnt);
    stop();
    setGame(game);
    setIsStarted(true);
    setTable(drawTable(game.maze.field));
    setIsLose(false);
  }
  function stop() {
    setIsStarted(false);
    setGame(null);
    clearInterval(interval.current);
  }
  function lose() {
    setIsLose(true);
    stop();
    onLose(game.points);
  }
  function drawTable(arr) {
    return arr.map((row, i) => {
      return (
        <tr key={i}>
          {row.map((cell, j) => {
            return (
              <td
                key={j}
                style={{
                  width: `${100 / width}%`,
                  height: `${
                    tableContainer.current &&
                    Number(
                      window
                        .getComputedStyle(tableContainer.current)
                        .getPropertyValue("width")
                        .slice(0, -2)
                    ) / width
                  }px`,
                  backgroundImage: `url(${getBlockImage(themeId, cell)})`,
                }}
                className="myTd"
              ></td>
            );
          })}
        </tr>
      );
    });
  }

  function getBlockImage(id, cell) {
    switch (id) {
      case 0:
        switch (cell) {
          case "W":
            return themes[0].wall;
          case "E":
            return themes[0].enemie;
          case "P":
            return themes[0].player;
          case "F":
            return themes[0].fruit;
          default:
            return "";
        }
      case 1:
        switch (cell) {
          case "W":
            return themes[1].wall;
          case "E":
            return themes[1].enemie;
          case "P":
            return themes[1].player;
          case "F":
            return themes[1].fruit;
          default:
            return "";
        }
      case 2:
        switch (cell) {
          case "W":
            return themes[2].wall;
          case "E":
            return themes[2].enemie;
          case "P":
            return themes[2].player;
          case "F":
            return themes[2].fruit;
          default:
            return "";
        }
      case 3:
        switch (cell) {
          case "W":
            return themes[3].wall;
          case "E":
            return themes[3].enemie;
          case "P":
            return themes[3].player;
          case "F":
            return themes[3].fruit;
          default:
            return "";
        }
      default:
        switch (cell) {
          case "W":
            return themes[0].wall;
          case "E":
            return themes[0].enemie;
          case "P":
            return themes[0].player;
          case "F":
            return themes[0].fruit;
          default:
            return "";
        }
    }
  }
  return (
    <div className="w-100 bg-white rounded-3 p-4">
      <h4>Игра</h4>
      <div className="my-2">
        <label className="me-2">Ширина:</label>
        <input
          id="width"
          className="rounded-2 border-0 grey-200 px-2"
          placeholder="Ширина поля"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          type="number"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Высота:</label>
        <input
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          type="number"
          placeholder="Высота поля"
          className="rounded-2 border-0 grey-200 px-2"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Количество противников:</label>
        <input
          id="enemyCnt"
          value={enemyCnt}
          onChange={(e) => setEnemyCnt(e.target.value)}
          type="number"
          placeholder="Кол-во противников"
          className="rounded-2 border-0 grey-200 px-2"
        />
      </div>
      <div className="my-2">
        <label className="me-2">Количество фруктов:</label>
        <input
          id="fruitsCnt"
          value={fruitsCnt}
          onChange={(e) => setFruitsCnt(e.target.value)}
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
        <ButtonGroup className="w-100">
          {themes.map((theme, i) => (
            <Button
              key={i}
              variant={themeId === theme.id ? "primary" : "outline-primary"}
              onClick={() => {
                setThemeId(theme.id);
              }}
            >
              {theme.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div
        className="rounded-3 border border-2 rounded-4 d-inline-block w-100"
        ref={tableContainer}
      >
        <p className="m-0 mx-auto text-center">
          {game && `Очков: ${game.points}`}
        </p>
        <table
          id="mytable1"
          cellPadding="5px"
          cellSpacing="0px"
          className="w-100"
        >
          {<tbody>{table}</tbody>}
        </table>
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
