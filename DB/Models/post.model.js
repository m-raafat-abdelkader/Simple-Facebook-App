import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Post = sequelize.define(
    'Post',
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allowNull:false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
    },
    {
        timestamps: true
    }
)


User.hasMany(Post,
    {
        foreignKey:{
            allowNull: false
        }
    },
    {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
);

Post.belongsTo(User);

export default Post;