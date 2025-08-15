import express from 'express'
import { AiResponse } from '../controller/AiController.js'

export const AiRouter = express.Router()

AiRouter.post('/aichat',AiResponse)