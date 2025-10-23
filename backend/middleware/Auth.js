import {cookies} from "cookie-parser";
import {jwt} from 'jsonwebtoken'
import User from "../models/DBmodel";
const JWT_SECRET = process.env.JWT_SECRET;

export const auth = async (req,res, next)=>{
    try {
        const token = req.cookies.token
    
        if (!token) {
      return res.status(401).json({ message: 'Authentication required' })

    }
      const decode = jwt.verify(token,JWT_SECRET)
      const user = await User.findById(decode.id).select('-password')
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.user = user;
      next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}