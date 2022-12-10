import { Request, Response } from 'express';
import CommentModel from '../models/comment';
import UserModel from '../models/user';

export const addNew = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const doc = new CommentModel({
            user: user._id,
            text: req.body.text,
        });
        await doc.save();
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error',
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const comments = await CommentModel.find({}).populate('user').sort({"createdAt": -1}).exec();
        res.json(comments.map(x => ({
            userId: x.user._id,
            fullName: (x.user as any).fullName,
            time: (x as any).createdAt,
            text: x.text,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error',
        });
    }
}
