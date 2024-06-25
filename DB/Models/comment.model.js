import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Post from "./post.model.js";

const Comment = sequelize.define(
    'Comment',
    {
        content:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        timestamps: true
    }
)

User.hasMany(Comment,
    {
        foreignKey: {
            allowNull: false
        },
        
    },
    {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
)
Comment.belongsTo(User)

Post.hasMany(Comment,
    {
        foreignKey: {
            allowNull: false
        }
    },
    {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
   
)
Comment.belongsTo(Post)


export default Comment;