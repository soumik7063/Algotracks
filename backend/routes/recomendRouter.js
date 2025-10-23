import express from 'express';
import { recomend } from '../controller/RecomendController.js';

export const recomendRouter = express.Router();

recomendRouter.get("/", recomend);