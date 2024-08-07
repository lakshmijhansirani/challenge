const jwt=require('jsonwebtoken');
const JWT_SECRET='your_jwt_secret';
const verifyToken=(req,res,next)=>{
    const token=req.header('Authorization')?.split(' ')[1];

    if(!token)
        return res.status(401).json({meassage:'Acess Denied'});
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.indexOf;
        next();
    }
    catch(error)
    {
        res.status(400).json({message:'Invalid token'});

    }
};
module.exports={verifyToken};