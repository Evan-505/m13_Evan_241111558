const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./db");
const jwt = require("jsonwebtoken");
const passport = require("./config/passport");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("nim:241111558,nama:evan");
});

app.get("/profile",
    passport.authenticate(
        "jwt",
        {session:false}
    ),
    (req,res) => {
        res.json({
            message: "akses berhasil",
            user: req.user
        });
    }
);

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO m13(username,password) VALUES (?,?)",
        [username, hashPassword],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Register berhasil"
            });

        }
    );

});

app.post("/login", (req,res)=>{
    const {username,password} = req.body;
    db.query(
        "SELECT * FROM m13 WHERE username = ?",
        [username],
        async (err, result)=>{
            if (err){
                return res.status(500).json(err);
            }
            if (result.length === 0){
                return res.status(404).json({
                    message: "user tidak ditemukan"
                });
            }
        const validPassword = await bcrypt.compare(
            password,
            result[0].password
        );
        if(!validPassword){
            return res.status(401).json({
                message: "password salah"
            });
        }
        const token = jwt.sign(
            {
                id:result[0].id,
                username: result[0].username
            },
            "secretkey",
            {
                expiresIn: "1h"
            }
        );
        res.json({
            message: "login berhasil",
            token: token
        });
    }
);
});

app.listen(3000, () => {
    console.log("Server jalan");
});
