import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'password must be at least 8 characters').isLength({ min: 8 }),
    body('fullName', 'full name must be at least 3 characters').isLength({ min: 3 }),
    body('avatarUrl', 'avatar URL must be correct').optional().isURL(),
];
