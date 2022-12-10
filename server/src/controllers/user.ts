import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/user';

export const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'No user in db',
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Incorrect login or password',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'swordsismileat',
            {
                expiresIn: '7d',
            }
        );

        const { passwordHash, ...userData } = (user as any)._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Login error',
        });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            score: 0,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id
            },
            'swordsismileat',
            {
                expiresIn: '7d',
            }
        );

        const { passwordHash, ...userData } = (user as any)._doc;

        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Registration error',
        });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const { passwordHash, ...userData } = (user as any)._doc;

        res.json({
            ...userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'access denied',
        });
    }
}

export const changeScore = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        user.score = Math.max(user.score + req.body.scoreChange, 0);
        await user.save();
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error',
        });
    }
}

export const getLeaders = async (req: Request, res: Response) => {
    try {
        const leaders = await UserModel.find({}).sort({"score": -1}).limit(10).exec();
        res.json(leaders.map(x => ({
            fullName: x.fullName,
            score: x.score,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error',
        });
    }
}
