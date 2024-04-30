require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');

const bodyParser = require('body-parser');
const helmet = require('helmet');


const port  = process.env.PORT;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

//Middle Wear//


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req,res)=>{
    res.send("Hello world!")
})