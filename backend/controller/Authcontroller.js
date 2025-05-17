import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import User from '../models/DBmodel.js'
const JWT_SECRET = "1234567";
const {jwt,sign,verify} = pkg;
console.log(User)
export const signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res
        .status(400)
        .json({
          message: "User already exists, you can login",
          success: false,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Sign up successfully", success: true });
    } catch (error) {
      console.log("error: ",error)
    res.status(500).json({ message: "internal server error", success: false });
        
    }
}


export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      const errormsg = "Credentials do not match";
      
      if (!existingUser) {
          return res.status(403).json({ message: errormsg, success: false });
      }
      
      const isPassequal = await bcrypt.compare(password, existingUser.password);
      if (!isPassequal) {
          return res.status(403).json({ message: errormsg, success: false });
      }
      
      const jwt_token = sign(
          {
              name: existingUser.name,
              email: existingUser.email,
              _id: existingUser._id
          },
          process.env.JWT_SECRET,
          {
              expiresIn: '24h'
          }
      );
      const cpProfiles = existingUser.cpProfiles;
      
      res.status(200).json({
          message: 'login successfully',
          success: true,
          token: jwt_token,
          user: {
              email,
              name: existingUser.name,
              cpProfiles:cpProfiles
          }
      });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
}

export const getMe = async (req, res) => {
    try {
      const userId = req.user._id;
      
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ 
          message: "User not found", 
          success: false 
        });
      }
      
      res.status(200).json({ 
        user, 
        success: true 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: "Internal server error", 
        success: false 
      });
    } 
  };
  export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" ,success:false});
    }
  
    const token =  req.headers.authorization && req.headers.authorization.split(" ")[1];
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // ← this is where req.user is set
      next();
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: "Invalid token" ,success:false});
    }
  };


export const updatePlatformIds = async (req, res) => {
  try {
    const { email, platform, platformID } = req.body;
    
    if (!email || !platform || platformID === undefined) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        success: false 
      });
    }
    
    // const validPlatforms = ['Codeforce', 'Leetcode', 'Codechef', 'Atcoder'];
    // if (!validPlatforms.includes(platform)) {
    //   return res.status(400).json({ 
    //     message: "Invalid platform", 
    //     success: false 
    //   });
    // }
    
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false 
      });
    }
    if(platform === "name" || platform === "email"){
      if(platform === "name"){
        existingUser.name = platformID;
      }else{
        existingUser.email = platformID;
      }
    }
    else existingUser.cpProfiles[platform] = platformID;
    
    await existingUser.save();
    
    return res.status(200).json({
      message: "Platform ID updated successfully",
      success: true,
    });
    
  } catch (error) {
    console.error("Error updating platform ID:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
}