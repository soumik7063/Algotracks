import express from 'express'
import { leetCodeContest } from '../controller/LeetcodeApi.js';

export const leetcodeRouter = express.Router();

leetcodeRouter.post('/',leetCodeContest)