require('dotenv').config();
//const DB_CONFIG = process.env.DB_CONFIG || 'postgresql://contacts:contacts@localhost:5432/contacts';
const DB_CONFIG = 'postgresql://contacts:contacts@localhost:5432/contacts';

const { Pool } = require('pg');

console.log(process.env.DB_CONFIG);

//const pgconn = new Pool({
//    connectionString: DB_CONFIG,
//    ssl: false,
//});
  
const pgconn = new Pool({
    connectionString: process.env.DB_CONFIG,
    ssl: false,
});

module.exports = { pgconn }