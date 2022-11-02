import express from 'express';
import mongoose from 'mongoose';

import * as UserController from './controllers/user';
import * as MapController from './controllers/map';
import { registerValidation } from './validations/auth';
import checkAuth from './utils/check-auth';

mongoose.connect(
    process.env.MONGODB_URI || ''
    ).then(() => {
        console.log('DB connected');
    }).catch((err) => {
        console.log('DB error', err);
    });

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/game/map', MapController.loadMap);

app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
});
