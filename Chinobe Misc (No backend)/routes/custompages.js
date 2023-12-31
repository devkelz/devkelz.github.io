const express = require('express')
const app = express.Router()
const {getUser, getUserById} = require("../helpers/users")
const abbv = require('../helpers/abbreviate')
const executeQuery = require('../helpers/db')

app.get("/home",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.render("home", {id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix)})
})

app.get("/users/:id/profile",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    const otheruser = await getUserById(req.params.id)
    if (!otheruser) {
        return res.status(404).redirect("/home")
    }
    res.render("profile", {id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix), otherusername: otheruser.username})
})

app.get("/register",async(req,res)=>{
    const user = await getUser(req)
    if (user) {
        return res.redirect("/home")
    }
    res.render("register")
})

app.get("/games",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.render("games",{id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix)})
})

app.get("/games/:id/:name",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.render("gamepage",{id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix)})
})
app.get("/marketplace/:id/:name",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    const assets = await executeQuery(`SELECT * FROM assets WHERE id = $1`, [req.params.id])
    const asset = assets[0]
    const price = asset.tix != null && asset.robux != null ? `$${abbv(asset.robux)} Robux and $${abbv(asset.tix)} Tix` : asset.tix != null ? `$${abbv(asset.tix)} Tix` : asset.robux != null ? `$${abbv(asset.robux)} Robux` : null
    res.render("item",{id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix), itemname: asset.name, itemprice: price})
})
app.get("/marketplace",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    const assets = await executeQuery(`SELECT * FROM assets WHERE assettypeid != 9`, [])
    const items = assets.map(asset => {
        const price = asset.tix != null && asset.robux != null ? `$${abbv(asset.robux)} Robux and $${abbv(asset.tix)} Tix` : asset.tix != null ? `$${abbv(asset.tix)} Tix` : asset.robux != null ? `$${abbv(asset.robux)} Robux` : null
        if (price == null) {
            return null
        } 
        return `<div class="item">
        <div class="item-icon"></div>
       <img src="https://tr.rbxcdn.com/7bc3376521f46ba36b30639bc92055ac/420/420/Hat/Png" alt="a">
  
        <div class="item-name">${asset.name}</div>
        <a href="/marketplace/${asset.id}/--">View Item Page</a>
        <div class="item-price">Price: ${price}</div>
      </div>`
    }).filter(item => item != null).join("\n")
    res.render("marketplace",{id: user.id,username: user.username, robux: abbv(user.robux), tix: abbv(user.tix), items: items})
})

app.get("/",async(req,res)=>{
    const user = await getUser(req)
    if (user) {
        return res.redirect("/home")
    }
    res.render("landing")
})

app.get("/Login",async(req,res)=>{
    const user = await getUser(req)
    if (user) {
        return res.redirect("/home")
    }
    res.render('login')
})

app.get("/download",async(req,res)=>{
    const user = await getUser(req)
    if (user) {
        return res.redirect("/download")
    }
    res.render('download')
})

app.get("/inventory",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/inventory")
    }
    res.render('inventory')
})

app.get("/roadmap",async(req,res)=>{
    const user = await getUser(req)
    if (user) {
        return res.redirect("/roadmap")
    }
    res.render('roadmap')
})

app.get("/logout",async(req,res)=>{
    res.cookie(".ROBLOSECURITY", "", {domain: ".chinob.xyz", httpOnly: true, secure: true})
    res.redirect("/")
})

module.exports = app;