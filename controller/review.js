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
          message: "review created successfully",
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

    

review.get("/reviews",async(req,res)=>{
    try{
        const reviews = await reviewSchema.find({}).toArray();
    
        res.json(reviews);
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    });


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


review.delete("/delete-review/:id",async(req,res)=>{
 await reviewSchema.findOneAndDelete({ _id: new ObjectId(req.params.id)})
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })


module.exports =review;