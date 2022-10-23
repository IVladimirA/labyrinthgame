"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGameMap = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cell_coordinate_1 = __importDefault(require("./cell-coordinate"));
const game_map_1 = __importDefault(require("./game-map"));
function loadGameMap(mapPath) {
    const mapConfig = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../resources/maps', mapPath), { encoding: 'utf-8' });
    const parsedConfig = JSON.parse(mapConfig);
    return new game_map_1.default(parsedConfig.mapLayout, new cell_coordinate_1.default(parsedConfig.startCell.row, parsedConfig.startCell.column));
}
exports.loadGameMap = loadGameMap;
