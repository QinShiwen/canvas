

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post('/ifemailexists',(req,res)=>{
    res.send(req.body)
    console.log(req.body)
})

app.post('/register',(req,res)=>{

})

app.listen(port,()=>{
    console.log("Server is running on port "+port)
})