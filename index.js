const express=require('express');
const {transports,format}=require('winston');
const expressWinston=require('express-winston');
require('winston-mongodb');
const { connection } = require("./db");
const router=require('./routes/user.routes');
const leaveRouter=require('./routes/leaveRequest');
const app=express();
app.use(express.json());


app.use(expressWinston.logger({
    transports:[
        //for console.
        // new transports.Console({
        //     json:true,
        //     colorize:true,
        //     level:"error"
        // })

        //for file.
        // new transports.File({
        //     json:true,
        //     level:"silly",
        //     filename:"warnninglogs.log"
        // })

        //for mongodb
        new transports.MongoDB({
            json: true,
            level: "silly",
            db: "mongodb+srv://anjalipandey:anjalipandey@cluster0.oumymuv.mongodb.net/winston?retryWrites=true&w=majority",
            collection: "winstonError",
            options: {
                useUnifiedTopology: true, 
            }
        
         })

    ],
    format:format.combine(
        format.colorize(),
        format.json(),
        format.timestamp(),
        format.prettyPrint(),
    ),
    msg:"HTTP {{req.method}} {{req.url}}",
    statusLevels:true
}))


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