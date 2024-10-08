const express = require("express");
const reviewSchema = require("../model/reviewSchema");
const review = express.Router();
const mongoose = require("mongoose");


review.post("/", async function (req, res) {
    try {
      const reviews = new reviewSchema({
        reviewSchema: req.body.reviewSchema,
      });
      await reviews.save();
      res.json({ message: " review successfully", reviews: reviews._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


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