require("dotenv").config({ path: `${process.cwd()}/.env.example` });

const { DB_HOST } = process.env;
const { DB_USERNAME } = process.env;
const { DB_DATABASE } = process.env;
const { DB_PASSWORD } = process.env;
const { PORT } = process.env;
const { PRIVATE_KEY } = process.env;

module.exports = {
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    PORT,
    PRIVATE_KEY
};
