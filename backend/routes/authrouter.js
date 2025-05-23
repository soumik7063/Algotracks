import express from 'express';
import { signup, login, updatePlatformIds, getMe, authenticate } from '../controller/Authcontroller.js';

export const authrouter = express.Router();

authrouter.post('/signup', signup);
authrouter.post('/login', login);
authrouter.post('/update', updatePlatformIds);
authrouter.get('/me',authenticate, getMe);

