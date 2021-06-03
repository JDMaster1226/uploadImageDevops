const express=require('express');

const routers = express.Router();
const images = require('./images-router');


routers.get('/',(req,res)=>{
    res.send({
        status:0,
        message:'router index'
    });
});



routers.use('/images',images);



module.exports=routers;