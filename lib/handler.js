const mongoose = require ("mongoose");
const {Schema} = mongoose; 
const express = require ("express")

//define user model

const schema = new mongoose.Schema({
    username :{ type : String,required : true },
    email :{ type : String,required : true },
}) 
const USER = mongoose.model("user",schema)

const api = express.Router();

api.post("/create",async(req,res)=>{
    try {
        require("./database")
        const user = await USER.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({message:"user already exist"})
        }
        const newuser = await USER.create(req.body)
        res.status(200).json({message :"user created",newuser})
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})

api.get("/get-all",async(req,res)=>{
    try {
        require("./database")
        const users = await USER.find()
        res.status(200).json({message :"found"+users.length,users})
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})

api.get("/get-one/:email",async(req,res)=>{
    try {
        require("./database")
        // const users = await USER.findOne()
        const user = await USER.findOne({email:req.params.email})
        if(!user){
            return res.status(404).json({message:"user not found"})

        }
         res.status(200).json({message :"found",user})
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})
api.put("/username-update",async(req,res)=>{
    try {
        require("./database")
        console.log(req.query.id)
        console.log(req.body)
        const update = await USER.findOneAndUpdate({_id:req.query.id},{username:req.body.username},{new:true} )
        console.log(update)
        res.status(200).json({message :"ok",update})
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        
    }

})
api.delete("/delete-user",async(req,res)=>{
    try {
        require("./database")
        const deleted = await USER.findByIdAndDelete(req.query.id)
        if(!deleted){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message :"ok",deleted})
        
        
    } catch (error) {
        res.status(500).json(error);
    }

})
api.post("/sent-email",async (req,res)=>{
    try {
        const sender =require("./mailer")
        await sender(req.body.email)
        res.status(200).json({message :"email sent"})
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})

module.exports = api ;


