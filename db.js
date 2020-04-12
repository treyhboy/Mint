const sequelize = require('sequelize');

require('dotenv').config({path: process.cwd() + '/.env.example'});

/**
 * @description database tables using sequelize
 */
const db = new sequelize ({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    dialect:"mysql"
});

/**
 * @description table name: credit , elements:mode, detail, amount
 */
const credit =  db.define('credit',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    mode: sequelize.DataTypes.STRING,
    detail:sequelize.DataTypes.BOOLEAN,
    amount:sequelize.DataTypes.INTEGER,
});

/**
 * @description table name: user , elements:username, email, pass, name, mob, budget
 */
const user =  db.define('user',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:sequelize.DataTypes.STRING,
    email:sequelize.DataTypes.STRING,
    password:sequelize.DataTypes.STRING,
    name:sequelize.DataTypes.STRING,
    mobile:sequelize.DataTypes.STRING,
    Budget:sequelize.DataTypes.INTEGER
});

/**
 * @description table name: spendings , elements:user, detail, amount, Mode
 */
const spendings =  db.define('spendings',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:sequelize.DataTypes.STRING,
    detail:sequelize.DataTypes.STRING,
    amount:sequelize.DataTypes.INTEGER,
    Mode:sequelize.DataTypes.STRING
});

/**
 * @description  table name: investment , elements:user, detail, amount, Mode
 */
const investment =  db.define('investment',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:sequelize.DataTypes.STRING,
    detail:sequelize.DataTypes.STRING,
    amount:sequelize.DataTypes.INTEGER,
    Mode:sequelize.DataTypes.STRING
});

/**
 * @description  table name: reminder , elements:user, detail, amount, date
 */
const reminder =  db.define('reminders',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:sequelize.DataTypes.STRING,
    detail:sequelize.DataTypes.STRING,
    amount:sequelize.DataTypes.INTEGER,
    date:sequelize.DataTypes.STRING
});

/**
 * @description  table name: transaction , elements:user, detail, amount, date, type
 */
const transaction = db.define('transaction',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user:sequelize.DataTypes.STRING,
    detail:sequelize.DataTypes.STRING,
    amount:sequelize.DataTypes.INTEGER,
    date:sequelize.DataTypes.STRING,
    type:sequelize.DataTypes.STRING,
    Mode:sequelize.DataTypes.STRING
})

db.sync().then(function () {
    console.log("Database is ready");
})

module.exports = {
    user,
    spendings,
    credit,
    reminder,
    investment,
    transaction
}
