import { Op } from "sequelize"
import Post from "../../../DB/Models/post.model.js"
import User from "../../../DB/Models/user.model.js"


//create a post 
export const createPost = async(req, res)=>{
    try {
        const {title, content, authorId} = req.body
        const isUserExist = await User.findByPk(authorId)
        if(!isUserExist){
            return res.status(400).json({message: "Please provide a valid authorID"})
        }
        if(!title || !content){
            return res.status(400).json({message: "Please include the title along with the content of your post"})
        }
        
        const newPost = await Post.create(
            {
                title, 
                content,
                UserId: authorId
            }
        )
        return res.status(201).json({
            message:"Post Created Successfully", 
            newPost: {title: newPost.title, content: newPost.content}
        })

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
    
}



//read a post 
export const readPost = async(req, res)=>{
    try {
        const {id} = req.query
        if(!id){
            return res.status(400).json({message: "Please include your postID"})
        }
        const post = await Post.findByPk(id,
            {
                attributes: [['id', 'postId'],'title', 'content']
            }
    
        )
        if(!post){
            return res.status(404).json({message: "Post is not found"})
        }

        return res.status(200).json({post})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}





//update a post 
export const updatePost = async(req, res)=>{
    try {
        const {authorId, postId} = req.query
        if(!authorId || !postId){
            return res.status(400).json({message: "Please include your ID along with the postID"})
        }

        const { title, content} = req.body
        if(!title && !content){
            return res.status(400).json({message: "You must provide at least one: title or content"})
        }
        const affectedRows = await Post.update(
            {title, content},
            {
                where:{
                    [Op.and]: [
                        {UserId: authorId},
                        {id: postId}
                    ]
                }
            }
    
        )
        if(!affectedRows[0]){
            return res.status(404).json({message: "Post is not found"})
        }

        return res.status(200).json({message: "Post is updated successfully"})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}





//delete a post (Soft Delete)
export const deletePost = async(req, res)=>{
    try {
        const {postId, authorId} = req.query
        if(!postId || !authorId){
            return res.status(400).json({message: "Please include your ID along with the postID"})
        }
        const affectedRows = await Post.update(
            {deleted: true},
            {
                where:{
                    UserId: authorId,
                    id: postId,
                    deleted: false 
                }
            }
    
        )
        if(!affectedRows[0]){
            return res.status(404).json({message: "Post is not found"})
        }
        return res.status(200).json({message: "Post is deleted successfully"})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}





//get a specific post with the author
export const getPost = async(req,res)=>{
    try {
      const {id} = req.query
      if(!id){
        return res.status(400).json({message: "Please include the postID"})
      }

      const post = await Post.findByPk(id,
        {
            attributes: [['id', 'postId'],'title', 'content'],
            include: {model:User, attributes: [['id', 'userId'], 'userName']}
        }
      )

      if(!post){
        return res.status(404).json({message: "Post is not found"})

      }
      return res.status(200).json({post})

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}