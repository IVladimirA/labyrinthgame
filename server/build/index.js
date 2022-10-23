"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const uuid_1 = require("uuid");
const game_1 = __importDefault(require("./game/game"));
const player_1 = __importDefault(require("./game/player"));
const resources_1 = require("./game/resources");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
const games = {};
app.post('/game/create', (req, res) => {
    const token = (0, uuid_1.v4)();
    const player = new player_1.default();
    const gameMap = (0, resources_1.loadGameMap)('default.json');
    games[token] = new game_1.default(gameMap, player);
    res.json({
        token,
        game: games[token]
    });
});
app.get('/game/state', (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(404).send('No token provided');
        return;
    }
    const game = games[token];
    if (!game) {
        res.status(404).send('Unknown token');
        return;
    }
    res.json({
        game
    });
});
app.post('/game/player/move', (req, res) => {
    const token = req.query.token;
    console.log('body', req.body);
    const direction = req.body.direction;
    console.log(direction);
    if (!token) {
        res.status(404).send('No token provided');
        return;
    }
    const game = games[token];
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
