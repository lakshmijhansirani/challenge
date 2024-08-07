const express=require('express')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/comments');
const{verifytoken}=require('./middleware/auth');
const { computeHeadingLevel } = require('@testing-library/react');
const { c } = require('tar');

const app=express()
;
//Middleware
app.use(bodyParser.json());

//routes
app.use('/api/auth',authRoutes)
app.use('/api/posts',verifytoken,postRoutes);
app.use('/api/comments',verifytoken,commentRoutes);
c//MongoDB connection
const MONGO_URI='MongoURL';
mongoose.connect(MONGO_URI,{useNeWUrlParser:true,useUnifiesTopology:true})
.then(()=>console.log('MongoDB connection'))
.catch(err=>console.log(err));

const PORT=5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}...`));
