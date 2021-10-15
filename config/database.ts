require('dotenv').config();

const pgp = require('pg-promise')();

export default pgp(process.env.DB_CONNECTION_STRING);