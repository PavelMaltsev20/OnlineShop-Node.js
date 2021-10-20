const mysql = require('mysql2')

const pool = mysql.createPool({
    host:"localhost",
    user: "root",
    database: "mytestschema",
    password: "Somepass16!"
})

module.exports = pool.promise();