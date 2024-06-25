import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";


const User = sequelize.define(
    'User',
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
)

export default User;