const express = require("express");
const {usermodel} = require("../models/usermodel")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userouter = express.Router();

userouter.post("/register",async(req,res)=>{
const {name,email,password,age,city} = req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=>{
            const newuser = new usermodel({name,email,password:hash,age,city});
            await newuser.save();
            res.status(200).send("new user added");
        });
    }catch(err){
        res.status(400).send(err.message);

    }
})


userouter.post("/login",async(req,res)=>{
       const {email,password} = req.body;
       try{
        const user =await usermodel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                // result == true
                if(result){
                    var token = jwt.sign({ userID:user._id,user:user.name}, 'masai');
                    res.status(200).json({"msg":"log in successful", "token": token})
                }
            });
        }
       }catch(err){
        res.status(400).json({"msg":err.message})
       }
})


module.exports ={
    userouter
}
