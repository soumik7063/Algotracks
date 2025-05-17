import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
// import {router as authrouter} from './routes/authrouter';

import {authrouter} from './routes/authrouter.js'
import { leetcodeRouter } from './routes/leetcodeRouter.js';
import './models/database.js'
import { updateBookmark } from './controller/BookmarkController.js';
dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()) //allow all origin
app.use(express.json())
app.use(cookieParser())



app.use('/auth',authrouter)
app.use('/leetcode',leetcodeRouter)
app.use('/bookmarks',updateBookmark)
app.listen(PORT, () => {
    console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});