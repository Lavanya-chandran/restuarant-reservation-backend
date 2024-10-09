const express = require("express");
const peopleSchema = require("../model/peopleSchema");
const people = express.Router();
const mongoose = require("mongoose");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");


people.post("/create-people", async (req, res) => {
    try {
        const {email,password } = req.body;

        if (!email||!password)
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        const user = await peopleSchema.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await peopleSchema.create({
            email,
            password: hashedPassword,
           
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

people.post("/login",async (req, res) => {
    try {
        const { email, password} = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Find user by email
        const user = await peopleSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
       
        // Set the cookie with token
        return res
            .status(200)
            .json({
                message: "Welcome",
                success: true,
            });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false,
        });
    }
});


people.get("/",(req,res)=>{
    peopleSchema.find((err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }

    })
})


people.route("/update-people/:id").get((req,res)=>{
    peopleSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    peopleSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req,params.id),{$set:req.body},(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


people.delete("/delete-people/:id",(req,res)=>{
    peopleSchema.findByIdAndRemove(mongoose.Types,ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})


module.exports = people;