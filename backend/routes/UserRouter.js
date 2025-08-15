import express from 'express'
import { forget_password, reset_password } from '../controller/UserController.js';

export const UserRouter = express.Router();

UserRouter.post('/forget_password',forget_password);
UserRouter.post('/reset_password',reset_password);