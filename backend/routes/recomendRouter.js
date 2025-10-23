import express from 'express';
import { recomend, newRecomend } from '../controller/RecomendController.js';

export const recomendRouter = express.Router();

recomendRouter.post("/recomend", recomend);
recomendRouter.post("/newrecomend", newRecomend);