import { Request, Response } from 'express';
import fs from 'fs'
import path from 'path'

export const loadMap = (req: Request, res: Response) => {
    const mapName: string = (req.body.mapName || 'default') + '.json';

    const mapConfig = fs.readFileSync(path.join(__dirname, '../../resources/maps/', mapName), { encoding: 'utf-8' });
    if (!mapConfig) {
        return res.status(404).json({
            message: 'Map not found',
        });
    }
    const parsedConfig = JSON.parse(mapConfig);
    res.status(200).json(parsedConfig);
};
