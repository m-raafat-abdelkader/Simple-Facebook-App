import Token from "../../DB/Models/token.model.js";
import User from "../../DB/Models/user.model.js";
import Post from "../../DB/Models/post.model.js";
import Comment from "../../DB/Models/comment.model.js";

import { compareSync, hashSync } from "bcrypt";
import { Op } from "sequelize";


//user registration 
export const register = async (req,res)=>{
    try {
        const {name, email, password} = req.body; 
        if(!name || !email || !password){
            return res.status(400).json({message: "Please enter your name, email address, and password"})
        }
        const hash = hashSync(password, 10);
        const newUser = await User.findOrCreate({
            where:{email},
            defaults:{userName: name, email, password: hash}
            
        })

        if(!newUser[1]){
            return res.status(409).json({message:"User Already Exists"})
        }

        
        return res.status(201).json(
        {   message:"User Registered Successfully", 
            newUser: {
                name:newUser[0].userName, 
                email:newUser[0].email, 
                password:newUser[0].password
            }

        })

    } catch (error){
        return res.status(500).json({message:"Internal Server Error"})
    }
    
    
}




//user login 
export const login = async (req,res)=>{
    try {
        const {email, password} = req.body; 
        if(!email || !password){
            return res.status(400).json({message: "You must provide your email along with your password"})
        }
      
        const isUserExist = await User.findOne(
            {
                where: {
                    email
                }
            }
        )
        if(!isUserExist){
            return res.status(401).json({message:"Invalid Credentials"})
        }

        const isMatch = compareSync(password, isUserExist.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"})

        }

        const tokenExists = await Token.findOne(
            {
                 where: {
                    UserId: isUserExist.id
                }
            }
        )

        if(tokenExists){
            return res.status(409).json({message: `You are already logged in`, token:tokenExists.authToken})  
        }

        const newToken = await Token.create(
            {
                UserId: isUserExist.id
            }
        )

        return res.status(200).json({message: `Successful Login and your Token is ${newToken.authToken}`})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
    
}



//user logout 
export const logout = async(req, res)=>{
   try {
    const {token} = req.body
    if(!token){
        return res.status(400).json({message: "Please provide your token"})
    }
    const affectedRows = await Token.destroy(
        {
            where:{
                authToken: token
            }
        }
    )
  
    if(!affectedRows){
        return res.status(404).json({message: "Invalid Token"})  
    }
    return res.status(200).json({message: "You are now logged out"})    

   } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
   }
}




//Get a specific user with a specific post and post’s comments
export const getUser = async (req,res)=>{
    try {
       const {userId, postId} = req.query;
       if(!userId || !postId){
        return res.status(400).json({message: "Please provide a userId and postId"})
       } 

       const user = await User.findOne({
        where:{id: userId},
        attributes: ['userName', 'email']
       })

       if(!user){
        return res.status(404).json({message: "User not found"})
       }

       const post = await Post.findOne({
        where:{
            [Op.and]: [{id: postId}, {UserId: userId}]
        }
        
       })
    
       if(!post){
        return res.status(200).json({user, message: "Post not found for this user"})
       }

       const userData = await User.findOne({
        where:{id:userId},
        attributes: ['userName', 'email'],
        include:[{model:Post, where:{id:postId}, attributes: ['title', 'content'], 
        include:[{model:Comment, attributes: ['content']}]}]
    })

    
       return res.status(200).json(userData)

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}