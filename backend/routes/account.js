const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account,User} = require("../db");
const mongoose = require("mongoose");
const accountRouter =  express.Router();

accountRouter.get("/balance", authMiddleware,async (req,res)=>{
    const userID=req.userID;
    const account = await Account.findOne({
        userId:userID
    })
    const balance = account.balance;
    res.status(200).json({
        balance : balance
    });
})

accountRouter.post("/transfer",authMiddleware,async (req,res)=>{
  
    const session = await mongoose.startSession();
    
    session.startTransaction();

    const {to,amount} = req.body;
    
   
    const from = req.userID
    const to1 = await User.findOne({username:to})
   
   
    const account = await Account.findOne({
        userId:from
    }).session(session);
    console.log(account)
   
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        });
    }

    const toaccount = await Account.findOne({
        userId:to1._id
    }).session(session);
    console.log(toaccount);
    if(!toaccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        });
    }
    await Account.updateOne({ userId:req.userID},{$inc: {balance:-amount}}).session(session);
    await Account.updateOne({ _id:toaccount._id},{$inc: {balance:amount}}).session(session);
    
    await session.commitTransaction();
    res.status(200).json({
        message: " Transfer Succesfull"
    })
})



module.exports=accountRouter
