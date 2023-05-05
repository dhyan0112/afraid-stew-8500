const express = require("express");
const { connection } = require("./db");
const {userouter} = require("./router/user.route");
const {auth} = require("./auth/auth")
const {articlerouter} = require("./router/article.route")
const rateLimit = require('express-rate-limit')
const jwt = require("jsonwebtoken");
require('dotenv').config()

const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs:60*1000,
    max:5,
    message : "max request limit has been exceed"
})
  app.use(limiter);
app.get("/",(req,res)=>{
    res.send(200).send("home page");
})

app.use("/user",userouter);
app.use(auth);

app.use("/article",articlerouter);

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected to DB ");
    }catch(err){
        console.log(err.message)
    }
    console.log(`server is running at ${process.env.port}`);
})




