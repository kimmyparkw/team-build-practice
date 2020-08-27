const pgp = require('pg-promise')(options);
require('dotenv').config()
const DB_NAME = process.env.DB_NAME || "movies_p3_dev";

const options = {
    query: (e) => {
        console.log(e.query);
    }
}


function setDatabase() {
    if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        return pgp({
            database: 'movies_p3_dev',
            port: 5432,
            host: 'localhost',
        })
    }
    else if(process.env.NODE_ENV === 'production') {
        return pgp(process.env.DATABASE_URL);
    }
}

const db = setDatabase();

module.exports = db;