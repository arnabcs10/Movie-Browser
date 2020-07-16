//Packages
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
//app config
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
dotenv.config();

const PORT = process.env.PORT;
const key = process.env.API_KEY;



//Routes
app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/result",(req,res)=>{
    
    request("http://www.omdbapi.com/?s="+req.query.name+`&apikey=${key}`,(error,response,body)=>{
        if(!error && response.statusCode==200)
        {
            let data = JSON.parse(body);
            res.render('result',{data:data,searchKey:req.query.name});
        }
        else
        {
            res.render('error');
            console.log(error);
        }
    });
    
});

app.get("/view/:id",(req,res)=>{
    request("http://www.omdbapi.com/?i="+req.params.id+`&apikey=${key}`,(err,response,body)=>{
        if(!err && response.statusCode==200)
        {
            let data = JSON.parse(body);
            res.render('view',{data:data});
        }
        else
        {
            res.render('error');
            console.log(err);
        }
    })
})

app.listen(PORT,process.env.IP,function(){
    console.log(`Server Started at ${PORT}`);
    console.log(`use localhost:${PORT}`);
});


