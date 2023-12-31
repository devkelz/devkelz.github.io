const express = require('express');
const { join } = require('path');
const app = express.Router()
app.get("/homestuff/navbarscript.js",(req,res)=>{
    res.sendFile(join(__dirname, "..", "static", "homestuff", "navbarscript.js"))
})

module.exports = app;