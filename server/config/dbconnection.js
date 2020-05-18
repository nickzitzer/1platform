const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    database: "1platform",
    user: "1platformrootadmin",
    password: "h6uB9^V=ehhdD3+Z"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database.");
});

module.exports = connection;
