import {cookies} from "cookie-parser";
import {jwt} from 'jsonwebtoken'
import User from "../models/DBmodel";
const auth = async (req,res, next)=>{
    try {
        const token = req.cookies.token
    
        if (!token) {
      return res.status(401).json({ message: 'Authentication required' })

    }
      const decode = jwt.verify(token,process.env.JWT_SECRET || 'your_jwt_secret')
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