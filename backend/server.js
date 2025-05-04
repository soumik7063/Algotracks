import express from 'express';
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
// import {router as authrouter} from './routes/authrouter';

import {authrouter} from './routes/authrouter.js'
import { leetcodeRouter } from './routes/leetcodeRouter.js';
import './models/database.js'
import { updateBookmark } from './controller/BookmarkController.js';
dotenv.config()


const app = express();
const PORT = 3000;

app.use(cors()) //allow all origin
app.use(express.json())
app.use(cookieParser())


// app.post('/leetcode',async (req,res)=>{
//     try {
//         const leetcodeResponse = await fetch('https://leetcode.com/graphql',{
//             method:'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req.body),
//         })

//         const data = await leetcodeResponse.json();
//         res.json(data)
//     } catch (error) {
//         console.error('Error fetching from LeetCode:', error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// })
// app.use('/leetcode',router)
app.use('/auth',authrouter)
app.use('/leetcode',leetcodeRouter)
app.use('/bookmarks',updateBookmark)
app.listen(PORT, () => {
    console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});