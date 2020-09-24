const util = require("util");
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ash4Cynth!4',
    database: 'staffDB'
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;