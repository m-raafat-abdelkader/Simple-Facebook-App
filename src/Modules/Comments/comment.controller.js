import Comment from "../../../DB/Models/comment.model.js";
import Post from "../../../DB/Models/post.model.js";
import User from "../../../DB/Models/user.model.js";




//create a comment 
export const createComment = async (req, res)=>{
   try {
        const {content, postId, authorId} = req.body 
        const isUserExist = await User.findByPk(authorId)
        const isPostExist = await Post.findByPk(postId)

        if(!isUserExist || !isPostExist){
            return res.status(400).json({message: "You must provide a valid userID along with a valid postID"})
        }

        if(!content){
            return res.status(400).json({message: "Please include the content of your comment"})
        }

        const newComment = await Comment.create(
            {
                content, 
                PostId: postId,
                UserId: authorId
            }
        )

        return res.status(201).json({
            message:"Comment Created Successfully", 
            content: newComment.content
        })

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}





//read a comment
export const readComment = async(req, res)=>{
  try {
        const {id} = req.query 
        if(!id){
            return res.status(400).json({message: "Please include your commentID"})
        }
        const isCommentExist = await Comment.findByPk(id,
            {
                attributes: [['id', 'commentId'],'content', 'PostId', 'UserId']
            }
        

        )

        if(!isCommentExist){
            return res.status(404).json({message: "Comment is not found"})
        }

        return res.status(200).json({comment:isCommentExist})

  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})

  }
}






//update a comment
export const updateComment = async(req, res)=>{
   try {
        const {commentId, authorId} = req.query

        if(!commentId || !authorId){
            return res.status(400).json({message: "Please include your ID along with the commentID"})
        }

        const {content} = req.body

        if(!content){
             return res.status(400).json({message: "Please include your content"})
        }
        const affectedRows = await Comment.update(
            {content}, 
            {
                where:{
                    UserId: authorId, 
                    id: commentId
                }
            }     
        )
      
        if(!affectedRows[0]){
            return res.status(404).json({message: "Comment is not found"})
        }

        
        return res.status(200).json({message: "Comment is updated successfully"})

   } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})

   }
    
}






//delete a comment (Hard Delete)
export const deleteComment = async(req, res)=>{
   try {
        const {commentId, authorId} = req.query

        if(!commentId || !authorId){
            return res.status(400).json({message: "Please include your ID along with the commentID"})
        }

        const affectedRows = await Comment.destroy(
            {
                where:{
                    UserId: authorId, 
                    id: commentId
                }
            }     
        )

        if(!affectedRows){
            return res.status(404).json({message: "Comment is not found"})
        }


        return res.status(200).json({message: "Comment is deleted successfully"})

   } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})

   }
    
}

