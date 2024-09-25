const express = require("express");
const reserveSchema = require("../model/reserveSchema");
const reserve = express.Router();
const mongoose = require("mongoose");


reserve.post("/create", async function (req, res, next) {
    try {
      const reser = new reserveSchema({
        reserveSchema: req.body.reserveSchema,
      });
      await reser.save();
      res.json({ message: " reservation successfully", reser: reser._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


reserve.get("/reserve",(req,res)=>{
    reserveSchema.find((err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }

    })
})


reserve.route("/update-reserve/:id").get((req,res)=>{
    reserveSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    reserveSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req,params.id),{$set:req.body},(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


reserve.delete("/delete-reserve/:id",(req,res)=>{
reserveSchema.findByIdAndRemove(mongoose.Types,ObjectId(req.params,id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


module.exports =reserve;