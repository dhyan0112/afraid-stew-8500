const mongoose = require("mongoose");
 const userSchema = mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true
    },
    password : String,
    city: String,
    age: Number
 },
 {
    versionKey:false
 }
 )

 const usermodel = mongoose.model("evauser", userSchema);
 module.exports = {
    usermodel
 }