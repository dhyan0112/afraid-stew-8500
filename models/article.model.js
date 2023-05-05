const mongoose = require("mongoose");
 const articleSchema = mongoose.Schema({
    title: String,
    body: String,
    user: String,
    userID: String,
    category: String,
    live: Boolean
 },{
    versionKey: false
 })

 const articlemodel = mongoose.model("article", articleSchema);
 module.exports = {
    articlemodel
}