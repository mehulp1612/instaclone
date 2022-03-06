const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose  = require('mongoose');
const router = require('./routes/routes');
const app=express();
const URL="mongodb+srv://mehulp1612:Manku%402000@cluster0.riy7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const PORT=5000;
async function Connection(){
    // console.log("yaha aaya");
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("db chala");
    }
    catch(err){
        console.log("phata", err);
    }
};


app.listen(PORT,(req,res)=>{
    
    console.log("Server running");
})
app.get('/hello',(req,res)=>{
    res.json("servre aaya");
})
app.use('/',router);
Connection();
