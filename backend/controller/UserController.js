import User from "../models/DBmodel.js";
import nodemailer from 'nodemailer'
import randomstring from 'randomstring'
import bcrypt from 'bcrypt'
export const sendResetPasswordMail = async(name,email,token)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.emailUser,
                pass:'dtdh ghll iqgb cujt'
            }
        })

        const mailOptions = { 
            from:process.env.emailUser,
            to:email,
            subject:'Reset your password',
            html:'<p> Hii '+name+' , please copy the link and <a href="https://algotracks-frontend-1.onrender.com/reset_password?token='+token+'"> reset your password '
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Mail has been sent",info.response)
            }
        })
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}

export const forget_password = async(req,res)=>{
    try {
        const email = req.body.email;
        if(!email) res.status(400).send({success:false,msg:"Email not get "});

        const existingUser = await User.findOne({email:email})

        if(existingUser){
            const randomString = randomstring.generate()
            const data = await User.updateOne({email:email},{$set:{token:randomString}})
            sendResetPasswordMail(existingUser.name,existingUser.email,randomString)
            res.status(200).send({success:true,msg:"please check your email and reset update your password"})
        }else{
            res.status(400).send({success:false,msg:"this mail does not exists"});
        }

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
const secure_password = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        throw new Error("Failed to hash password: " + error.message);
    }
};
export const reset_password = async(req,res)=>{
    try {
        const token = req.query.token;
        const tokenData = await User.findOne({token:token});

        if(tokenData){
            const password = req.body.newPassword;
            const newPassword = await secure_password(password);
            const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword,token:''}},{new:true});
            res.status(200).send({success:true,msg:"Password has been updated",data:userData})

        }else{
            res.status(400).send({success:false,msg:"This link is expired"})
        }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}