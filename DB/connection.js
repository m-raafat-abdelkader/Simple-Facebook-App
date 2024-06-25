import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('bjhysidjozwqgfszngcb', 'u0a09b0si8nctadp', '7Z2HGUfWdpZa7AesDniw', {
    host: 'bjhysidjozwqgfszngcb-mysql.services.clever-cloud.com',
    dialect: 'mysql'
})

export const db_test = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch(error){
        console.log("Unable to connect to the database:", error);
    }
}

export const db_sync = async ()=>{
    try{
        await sequelize.sync();
        console.log("Connection has been established successfully.");
    }catch(error){
        console.log("Unable to connect to the database:", error);
    }
}


    