import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Token = sequelize.define(
    'Token',
    {
        authToken:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

User.hasOne(Token,
    {
        foreignKey: {
            allowNull: false,
        }
    },
    {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
)
Token.belongsTo(User)

export default Token;