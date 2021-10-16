const Sequelize = require("sequelize");

require("dotenv").config({ path: `${process.cwd()}/.env.example` });

/**
 * @description database tables using Sequelize
 */
const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    dialect: "mysql"
});

/**
 * @description table name: credit , elements:mode, detail, amount
 */
const Credit = db.define("credit", {
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
const User = db.define("user", {
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
const Spendings = db.define("spendings", {
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
const Investment = db.define("investment", {
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
const Reminder = db.define("reminders", {
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
const Transaction = db.define("transaction", {
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
    User,
    Spendings,
    Credit,
    Reminder,
    Investment,
    Transaction
};
