const express = require('express');
const { join } = require('path');
const app = express.Router()

app.get("/styles.css",(req,res)=>{
    res.sendFile(join(__dirname, "..", "static", "css", "styles.css"))
})
app.get("/homestuff/style.css",(req,res)=>{
    res.sendFile(join(__dirname, "..", "static", "homestuff", "style.css"))
})
app.get("/homestuff/navbar.css",(req,res)=>{
    res.sendFile(join(__dirname, "..", "static", "homestuff", "navbar.css"))
})
app.get("/alerts/alert1.css",(req,res)=>{
    res.sendFile(join(__dirname, "..", "static", "css", "alert.css"))
})

module.exports = app;