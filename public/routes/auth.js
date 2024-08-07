const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');

const router=express.Router();
const JWT_SECRET='ypur_jwt_secret';

//register
router.post('/register',async(req,res)) =>{

    const{ email,password}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({meassage:'user alraedy exists'});
        const hashedPassword=await bcrypt.hash(password,12);
    
        const newUser=new User({email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({meassage:'User registerd succesfully'});

    }
    catch(error)
    {
        res.status(500).json({meassage:'Something went wrong'});
    }
}
});
//Login
router.post('/login',async(req,res)=>{
    const { email,password}=req.body;
    try{
        const user=awit User.findOne({email})
        if(!user) return res.status(404).json({meassage:'user not found'});
        const isPassworCorrect=await bcrypt.compare(password,user.password);
        if(!isPassworCorrect)
            return res.status(400).json({meassage:'Invalid credential'});
        const token=jwt.sign({id:user._id}),JWT_SECRET,{exiresIn:'1H'});
     res.status(200).json({token});


    }
    catch(error)
    {

        res.status(500).json({meassage:'something went wrong'});
    }
});
module.exports=router;
