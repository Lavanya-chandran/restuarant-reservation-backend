const express = require("express");
const reviewSchema = require("../model/reviewSchema");
const review = express.Router();
const mongoose = require("mongoose");


review.post("/", async function (req, res) {
    try {
      const {username,comments,rating} =req.body
      if (!username||!comments||!rating)
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while signing in",
            success: false
        });
    }
})


review.get("/reviews",(req,res)=>{
    reviewSchema.find((err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }

    })
})


review.route("/update-review/:id").get((req,res)=>{
    reviewSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    reviewSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req,params.id),{$set:req.body},(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


review.delete("/delete-review/:id",(req,res)=>{
reviewSchema.findByIdAndRemove(mongoose.Types,ObjectId(req.params,id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


module.exports =review;