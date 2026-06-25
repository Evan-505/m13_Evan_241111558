const mysql2 = require("mysql2");

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "percobaan"
});

db.connect((err) => {
    if (err){
        console.log(err);
    }else{
        console.log("terhubung");
    }
});
module.exports = db;    