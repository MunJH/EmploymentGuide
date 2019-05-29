const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cksdn12z",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("mysql connected");
});

module.exports = con;
