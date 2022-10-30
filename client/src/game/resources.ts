import fs from 'fs'
import path from 'path'
import CellCoordinate from './cell-coordinate';
import GameMap from './game-map'

export function loadGameMap(mapPath: string): GameMap {
    const mapConfig = fs.readFileSync(path.join(__dirname, '../../resources/maps', mapPath), { encoding: 'utf-8' });
    const parsedConfig = JSON.parse(mapConfig);
    return new GameMap(
        parsedConfig.mapLayout,
        new CellCoordinate(parsedConfig.startCell.row, parsedConfig.startCell.column));
}