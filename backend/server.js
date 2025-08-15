import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
// import {router as authrouter} from './routes/authrouter';

import {authrouter} from './routes/authrouter.js'
import { leetcodeRouter } from './routes/leetcodeRouter.js';
import './models/database.js'
import { updateBookmark } from './controller/BookmarkController.js';
import { UserRouter } from './routes/UserRouter.js';
import { AiRouter } from './routes/AiRouter.js';
dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'https://algotracks-frontend-1.onrender.com',
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())



app.use('/auth',authrouter)
app.use('/leetcode',leetcodeRouter)
app.use('/bookmarks',updateBookmark)
app.use('/',UserRouter)
app.use('/',AiRouter)

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
});