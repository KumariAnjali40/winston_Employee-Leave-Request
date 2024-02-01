const express=require('express');
const { connection } = require("./db");
const router=require('./routes/user.routes');
const leaveRouter=require('./routes/leaveRequest');
const app=express();
app.use(express.json());


app.use('/emp',router);
app.use('/leave',leaveRouter);






app.listen(4500,async()=>{
    try{
       await connection
       console.log("connected to db");
       console.log("Server is running at port 4500");
    }catch(err){
        console.log(err);
    }
    
})