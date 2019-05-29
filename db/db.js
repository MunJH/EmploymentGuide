const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zero8787",
    database: "inheart"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("mysql connected");
});

module.exports = con;