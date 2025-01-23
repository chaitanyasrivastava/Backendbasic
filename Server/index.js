//const http = require("http");
const fs = require("fs");
const express = require("express");
const app= express();
app.get('/',(req, res)=>
{
    return res.send("hello from exoress home page")
})
app.get('/about',(req, res)=>
    {
        return res.send("hello from exoress about page"+ " hey " + req.query.name);
    });
   // function myhandler(req, res)
    
//const myServer = http.createServer(app);
    
    //(req, res) => {
    // const  log = `${Date.now()}: new reqest coming\n`;
    // fs.appendFile("log.txt", log, (err,data)=>{
    // switch(req.url){
    //     case"/":
    //     res.end("home page");
    //     break;
    //     case"/about":
    //     res.end("i am chaitanya");
    //     break;
    //     res.end("404 not found");

    app.get("/user/new", () =>(req, res) 
    )
    

app.listen(8000, () => console.log("server started") )

//myServer.listen(8000, () => console.log("server started"));
