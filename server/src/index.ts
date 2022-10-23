import express, { Request, Response, json } from 'express'
import { v4 as uuid } from 'uuid'
import Game, { GameDirection } from './game/game'
import GameMap from './game/game-map'
import Player from './game/player'
import { loadGameMap } from './game/resources'
import cors from 'cors';
import { Direction } from 'readline'

const app = express();
app.use(cors())
app.use(json())

const games: Record<string, Game> = {};

app.post('/game/create', (req: Request, res: Response) => {
    const token = uuid();
    const player = new Player();
    const gameMap = loadGameMap('default.json');
    games[token] = new Game(gameMap, player);
    res.json({
        token,
        game: games[token]
    });
});

app.get('/game/state', (req: Request, res: Response) => {
    const token = req.query.token as string;
    if (!token) {
        res.status(404).send('No token provided');
        return;
    }
    const game: Game = games[token];
    if (!game) {
        res.status(404).send('Unknown token');
        return;
    }
    res.json({
        game
    });
});

app.post('/game/player/move', (req: Request, res: Response) => {
    const token = req.query.token as string;
    console.log('body', req.body);
    const direction = req.body.direction as GameDirection;
    console.log(direction);
    if (!token) {
        res.status(404).send('No token provided');
        return;
    }
    const game: Game = games[token];
    if (!game) {
        res.status(404).send('Unknown token');
        return;
    }
    game.playerMove(direction);
    res.json({
        game
    });
});

app.listen(3000, () => {
    console.log('server started on port');
});
