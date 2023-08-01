const express= require('express');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const {SECRET}=require('../Middleware/auth');
const {authfunction}=require('../Middleware/auth');
const {User,Tasks}=require('../Database/index')
const router=express.Router();

router.post('/register',async(req,res)=>{
    const {mail,password}=req.body;
    const valid= await User.findOne({mail});
    if(valid){
        res.status(403).json("The user already exits..!!");
    }else{
        const newuser= new User({mail,password});
        await newuser.save();
        const token=jwt.sign({mail,role:'user'},SECRET,{ expiresIn:'1h' });
        res.status(200).json({message:"successfully created",token:token})
    }
})
router.post('/login', async(req,res)=>{
    const {mail,password}=req.body;
    const valid= await User.findOne({mail,password});
    if(valid){
        const token =jwt.sign({mail,role:'role'},SECRET,{ expiresIn:'1h' });
        res.status(200).json({message:"Succefully Loggned",token:token});
    }
    else{
        res.status(403).json({message:"invalid details"});
    }
})
router.post('/addtask',authfunction, async (req,res)=>{
        const task= new Tasks(req.body);
        await task.save();
        const user= await User.findOne({mail:req.user.mail});
        if(user){
            user.mytasks.push(task._id);
            await user.save();
            res.json({message:"The New Task is created...!!",id:task._id});
        }
        else{
            res.status(403).json({message:"unable to add the course"});
        } 
})
router.get('/myalltasks',authfunction, async (req,res)=>{
        const user= await User.findOne({mail:req.user.mail}).populate('mytasks');
        if(user){
            res.json({mytasks:user.mytasks || []});
        }else{
            res.json("User Not Found");
        }
})
router.get('/me',authfunction,(req,res)=>{
    res.json({mail:req.user.mail});
})
router.delete('/delete/:id',authfunction,async(req,res)=>{
     try{
         const taksid=req.params.id;
         const user=await User.findOne({mail:req.user.mail});
         const userid=user._id;
        await Tasks.findByIdAndDelete(taksid);
        await User.findByIdAndUpdate(userid,{$pull:{mytasks:taksid}});
        res.status(200).json({message:"Successfully Deleted the Task"});
     }catch{
      res.status(500).json({message:" An error is occurred in deleting the Task"});
     }
})
module.exports = router