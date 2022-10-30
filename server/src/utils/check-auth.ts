import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded: any = jwt.verify(token, 'swordsismileat');

            req.body.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Access denied',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Access denied',
        });
    }
}
