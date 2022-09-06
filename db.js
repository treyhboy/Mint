const Sequelize = require("sequelize");

require("dotenv").config({ path: `${process.cwd()}/.env.example` });

/**
 * @description database tables using Sequelize
 */
const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: "",
    port: process.env.PORT,
    dialect: "mysql"
});

/**
 * @description table name: credit , elements:mode, detail, amount
 */
const credit = db.define("credit", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mode: Sequelize.DataTypes.STRING,
    detail: Sequelize.DataTypes.BOOLEAN,
    amount: Sequelize.DataTypes.INTEGER
});

/**
 * @description table name: user , elements:username, email, pass, name, mob, budget
 */
const user = db.define("user", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    name: Sequelize.DataTypes.STRING,
    mobile: Sequelize.DataTypes.STRING,
    Budget: Sequelize.DataTypes.INTEGER
});

/**
 * @description table name: spendings , elements:user, detail, amount, Mode
 */
const spendings = db.define("spendings", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: Sequelize.DataTypes.STRING,
    detail: Sequelize.DataTypes.STRING,
    amount: Sequelize.DataTypes.INTEGER,
    Mode: Sequelize.DataTypes.STRING
});

/**
 * @description  table name: investment , elements:user, detail, amount, Mode
 */
const investment = db.define("investment", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: Sequelize.DataTypes.STRING,
    detail: Sequelize.DataTypes.STRING,
    amount: Sequelize.DataTypes.INTEGER,
    Mode: Sequelize.DataTypes.STRING
});

/**
 * @description  table name: reminder , elements:user, detail, amount, date
 */
const reminder = db.define("reminders", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: Sequelize.DataTypes.STRING,
    detail: Sequelize.DataTypes.STRING,
    amount: Sequelize.DataTypes.INTEGER,
    date: Sequelize.DataTypes.STRING
});

/**
 * @description  table name: transaction , elements:user, detail, amount, date, type
 */
const transaction = db.define("transaction", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: Sequelize.DataTypes.STRING,
    detail: Sequelize.DataTypes.STRING,
    amount: Sequelize.DataTypes.INTEGER,
    date: Sequelize.DataTypes.STRING,
    type: Sequelize.DataTypes.STRING,
    Mode: Sequelize.DataTypes.STRING
});

db.sync().then(function() {
    console.log("Database is ready");
});

module.exports = {
    user,
    spendings,
    credit,
    reminder,
    investment,
    transaction
};
