const express = require("express");
const {articlemodel} = require("../models/article.model")
const articlerouter = express.Router();

articlerouter.post("/create",async(req,res)=>{
    try{
        const article = new articlemodel(req.body);
        await article.save();
        res.send("article created");
    }catch(err){
        res.status(400).json({"msg":err.message});

    }

})


articlerouter.get("/",async(req,res)=>{
    const note =  await articlemodel.find({userID:req.body.userID});
    res.send(note);
})


articlerouter.patch("/update/:articleID",async(req,res)=>{
     const articleID = req.params.articleID;
           const article = await articlemodel.findOne({_id:articleID});
     try{
            if(req.body.userID !== article.userID){
                res.status(200).send({"msg":`you are not authorised to do this action`});
            }else{
                await articlemodel.findByIdAndUpdate({_id:articleID},req.body);
                res.status(200).send({"msg":`the note with the id ${articleID} has been added`});
            }
        }catch(err){
            res.status(400).send({"msg":err.message});
        }
})

articlerouter.delete("/delete/:articleID",async(req,res)=>{
    const articleID= req.params.articleID;
    const article = await articlemodel.findOne({_id:articleID})
    try{
      if(req.body.userID !== article.userID){
        res.status(200).send({"msg":`you are not authorised to do this action`});
      }else{
        await articlemodel.findByIdAndDelete({_id:articleID});
        res.status(200).send({"msg":`the note with the id ${articleID} has been added`});
      }    
       }catch(err){
           res.status(400).send({"msg":err.message});

       }
})


module.exports = {
    articlerouter
}





