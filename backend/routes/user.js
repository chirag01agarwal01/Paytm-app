const express = require('express');
const { user,signin, updateBody } = require('../types');
const { User, Account } = require('../db');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');
const userRouter = express.Router();
const  { authMiddleware } = require("../middleware");

userRouter.post("/signup",async (req,res)=>{
    const userPayload = req.body;
    const parsedPayload = user.safeParse(userPayload);
    
    if(parsedPayload.success){
        
        const existing = await User.findOne({
            username:userPayload.username
        })
        if(!existing){
            
            const user = await User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
            const userID = user._id
            
            await Account.create({
                userId: userID,
                balance :1 + Math.random() * 10000
            })

            const token = jwt.sign({
                userID:userID
            },JWT_SECRET);

            

            res.status(200).json({ 
                message:"user created succesfully",
                token:token
            });
            return}
        }
        res.status(411).json({ 
            message:"Email already taken/ Incorrect inputs"
        });
    
})
userRouter.post("/signin",async (req,res)=>{
    const userPayload = req.body;
    const parsedPayload = signin.safeParse(userPayload);
    if(parsedPayload.success){
        const user = await User.findOne({
            username:userPayload.username,
            password:userPayload.password
        })
        console.log(user)
        if(user){
            const userID = user._id;
            console.log(user._id);
            console.log(userID);
            const token = jwt.sign({
                userID:userID
            },JWT_SECRET);
            res.status(200).json({ 
                token:token
            });
            return}
        }
        res.status(411).json({ 
            message:"Error while logging in"
        });
    
})
userRouter.put("/", authMiddleware, async (req, res) => {
    console.log("here")
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
  
	try{
        await User.updateOne({ _id: req.userID },req.body);
        return res.json({
            message: "Updated successfully"
        })
    }
    catch(err){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
})
userRouter.get("/bulk",authMiddleware,async (req,res)=>{
    
    const filter = req.query.filter || "";
    console.log(filter)
    const users = await User.find({
        $and:[
            {$or:[{firstName:{"$regex":filter}},{lastName:{"$regex":filter}},{username:{"$regex":filter}}]},
            {_id:{$ne:req.userID}}
        ]
        
    })
    res.json({
        user :  users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
userRouter.get("/me",async (req,res)=>{
    
    const filter = req.query.filter || "";
    console.log(filter)
    const users = await User.find({
        $or:[{firstName:{"$regex":filter}},{lastName:{"$regex":filter}},{username:{"$regex":filter}}]
        
    })
    res.json({
        user :  users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=userRouter
