const express = require('express');
const { join } = require('path');
const app = express.Router()
const executeQuery = require('../helpers/db');
const { getUserByUsername, getUser, makeUser } = require('../helpers/users');
const { verify } = require('argon2');
const { ticketV3, ticketV4 } = require('../helpers/tickets');

app.post("/api/v1/users/signup",async(req,res)=>{
    // res.status(404).send("Not implemented")
    const isusermadeandcookie = await makeUser(req.body.username, req.body.password, req.body.invitekey)
    if (isusermadeandcookie != false) {
        res.cookie(".ROBLOSECURITY", isusermadeandcookie, {
            domain: ".chinob.xyz",
            maxAge: 1000 * 60 * 60 * 24 * 2000,
            // httpOnly: true,
            // secure: true,
            sameSite: 'strict',
            encode: String
        })
        res.redirect("/home")
    } else {
        res.status(404).send("Invalid Username Or Key")
    }
})
app.get("/v1/settings/application",(req,res)=>{
    if (req.query.applicationName.toLowerCase() == "pcdesktopclient") {
        res.type('json').sendFile(join(__dirname,"..", "FFlags", "shared.json"))
    } else if (req.query.applicationName.toLowerCase() == "rccserviceuriven") {
        res.type('json').sendFile(join(__dirname,"..", "FFlags", "shared.json"))
    } else {
        console.log(req.url)
        return res.status(404).send()
    }
})
app.all("/Login/Negotiate.ashx",(req,res)=>{
    // console.log(req.url)
    res.cookie(".ROBLOSECURITY", req.query.suggest, {
        domain: ".chinob.xyz",
        maxAge: 1000 * 60 * 60 * 24 * 2000,
        // httpOnly: true,
        // secure: true,
        sameSite: 'strict',
        encode: String
    })
    res.send("true")
})
app.get("/universes/validate-place-join",(req,res)=>{
    return res.send("true")
})
app.post('/game/validate-machine',(req,res)=>{
    res.send("true")
})
app.get("/asset-thumbnail/json",(req,res)=>{
    res.json({"Url":`https://www.chinob.xyz/thumbs/asset.ashx?id=${req.query.assetId}`,"Final":true})
  })
  app.get("/thumbs/gameicon.ashx",(req,res)=>{
    res.type('png').sendFile(join(__dirname, "..", "public", "placeholder.png"));
  })
app.get('/marketplace/productinfo',(req,res)=>{
    res.json({
        "AssetId": req.query.assetId,
        "ProductId": req.query.assetId,
        "Name": "Classic: Crossroads",
        "Description": "real",
        "AssetTypeId": 9,
        "Creator": {
            "Id": 1,
            "Name": "ROBLOX",
            "CreatorType": "User",
            "CreatorTargetId": 1
        },
        "IconImageAssetId": 0,
        "Created": "2023-12-02T23:17:21.953653Z",
        "Updated": "2023-12-02T23:17:21.953653Z",
        "PriceInRobux": null,
        "PriceInTickets": null,
        "Sales": 0,
        "IsNew": false,
        "IsForSale": false,
        "IsPublicDomain": false,
        "IsLimited": false,
        "IsLimitedUnique": false,
        "Remaining": 0,
        "MinimumMembershipLevel": 0,
        "ContentRatingTypeId": 0
    })
})
app.get("/game/join2019.ashx",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.type('txt').send(`--rbxsig2%Q90SH7SXz0W34t+UD0TF4mGPIyKJiPTLrzeYrfAtQeOHjkhTu4h+d4zPk9C4IFyLUuxPcDp2sZ9lrWcTPInoMnvIbkzNUjgoTZGP8BlYtgtEhQVlvZbSz0VMSY/PChtZKR9p+eIgeyXJjvlOQyiaTjEJKbmeXDXoP/b7aDiA0LcP1QSknJySFhGVpnvXsb+FR6RYhYfZkfF6a+Av+D2wK3z3r96Z7lIFBnwKOQuG/sFxq8YMvsvbY+DmKlX4zejaBLv1rc/7crh7CZ873EBzyRkPkljrs+NnaHpijsydcdy9dcykFcEHAC/gJI81vYOWH6Stk4b0vH1hau2Hc1TREg==%
{"ClientPort": 0,"MachineAddress":"localhost","ServerPort":53640,"PingUrl": "https://assetgame.chinob.xyz/Game/ClientPresence.ashx?version=old&PlaceID=3750369001&GameID=0788d83e-5c67-454f-b6f2-529986f139dc&UserID=1221979808","PingInterval": 120,"UserName": "${user.username}","SeleniumTestMode": false,"UserId": ${user.id},"RobloxLocale": "en_us","GameLocale": "en_us","SuperSafeChat": false,"CharacterAppearance": "https://api.chinob.xyz/v1.1/avatar-fetch/?placeId=${req.query.placeId}&userId=${user.id}","ClientTicket": "${await ticketV3(user.id,user.username,req.query.placeId)}","GameId": "0788d83e-5c67-454f-b6f2-529986f139dc","PlaceId": ${req.query.placeId},"MeasurementUrl": "https://assetgame.roblox.com/Game/ClientPresence.ashx?version=old&PlaceID=3750369001&GameID=0788d83e-5c67-454f-b6f2-529986f139dc&UserID=1221979808","WaitingForCharacterGuid": "47a79fba-bd8d-45ac-9163-19c0628352c9","BaseUrl": "http://assetgame.chinob.xyz/","ChatStyle": "Classic","VendorId": 17,"ScreenShotInfo": "unlimitedcoder2%27s+Place+Number%3a+4%0d%0aA+fun+game+by+BloxilityBot%0d%0aBuilt+in+ROBLOX%2c+the+free+online+building+game.+%0d%0ahttps%3a%2f%2fassetgame.roblox.com%2fgames%2f3750369001%2funlimitedcoder2s-Place-Number-4%0d%0aMore+about+this+level%3a%0d%0a","VideoInfo": "<?xml version=\"1.0\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:yt=\"http://gdata.youtube.com/schemas/2007\"><media:group><media:title type=\"plain\"><![CDATA[unlimitedcoder2&#39;s Place Number: 4 by unlimitedcoder2]]></media:title><media:description type=\"plain\"><![CDATA[\\n\\n Visit this place at http://www.roblox.com/games/3750369001/unlimitedcoder2s-Place-Number-4\\n\\nFor more games visit http://www.roblox.com]]></media:description><media:category scheme=\"http://gdata.youtube.com/schemas/2007/categories.cat\">Games</media:category><media:keywords>ROBLOX, video, free game, online virtual world</media:keywords></media:group></entry>","CreatorId": 1,"CreatorTypeEnum": "User","MembershipType": "BuildersClub","AccountAge": 12,"CookieStoreFirstTimePlayKey": "rbx_evt_ftp","CookieStoreFiveMinutePlayKey": "rbx_evt_fmp","CookieStoreEnabled": true,"IsRobloxPlace": false,"GenerateTeleportJoin": false,"IsUnknownOrUnder13": false,"GameChatType": "NoOne","SessionId": "{\"SessionId\":\"19176c68-019f-4459-b14d-59abd957d86f\",\"GameId\":\"0788d83e-5c67-454f-b6f2-529986f139dc\",\"PlaceId\":3750369001,\"ClientIpAddress\":\"86.22.79.39\",\"PlatformTypeId\":8,\"SessionStarted\":\"2019-09-08T10:32:51.0230402Z\",\"BrowserTrackerId\":43602833619,\"PartyId\":null,\"Age\":26.576950434695735,\"Latitude\":53.3167,\"Longitude\":-2.9833,\"CountryId\":2,\"PolicyCountryId\":null,\"LanguageId\":41,\"BlockedPlayerIds\":[]}","AnalyticsSessionId": "19176c68-019f-4459-b14d-59abd957d86f","DataCenterId": 262,"UniverseId": ${req.query.placeId},"BrowserTrackerId": ${user.id},"UsePortraitMode": false,"FollowUserId": 0,"characterAppearanceId": ${user.id},"CountryCode": "US"}`)})
app.all("/Game/PlaceLauncher2019.ashx",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.json({"jobId":"Test","status":2,"joinScriptUrl":`https://assetgame.chinob.xyz/game/Join2019.ashx?placeId=${req.query.placeId}`,"authenticationUrl":"https://assetgame.chinob.xyz/Login/Negotiate.ashx","authenticationTicket":user.token,"message":null})
})
app.all("/Game/PlaceLauncher2020.ashx",async(req,res)=>{
    const user = await getUser(req)
    if (!user) {
        return res.redirect("/")
    }
    res.json({"jobId":"Test","status":2,"joinScriptUrl":`https://assetgame.chinob.xyz/game/Join2020.ashx?placeId=${req.query.placeId}`,"authenticationUrl":"https://assetgame.chinob.xyz/Login/Negotiate.ashx","authenticationTicket":user.token,"message":null})
})
app.get("/game/join2020.ashx",async(req,res)=>{
    res.type('txt').send(`--rbxsig2%Q90SH7SXz0W34t+UD0TF4mGPIyKJiPTLrzeYrfAtQeOHjkhTu4h+d4zPk9C4IFyLUuxPcDp2sZ9lrWcTPInoMnvIbkzNUjgoTZGP8BlYtgtEhQVlvZbSz0VMSY/PChtZKR9p+eIgeyXJjvlOQyiaTjEJKbmeXDXoP/b7aDiA0LcP1QSknJySFhGVpnvXsb+FR6RYhYfZkfF6a+Av+D2wK3z3r96Z7lIFBnwKOQuG/sFxq8YMvsvbY+DmKlX4zejaBLv1rc/7crh7CZ873EBzyRkPkljrs+NnaHpijsydcdy9dcykFcEHAC/gJI81vYOWH6Stk4b0vH1hau2Hc1TREg==%
    {"ClientPort":0,"MachineAddress":"localhost","ServerPort":53640,"PingUrl":"","PingInterval":120,"UserName":"Player","SeleniumTestMode":false,"UserId":0,"RobloxLocale":"en_us","GameLocale":"en_us","SuperSafeChat":true,"CharacterAppearance":"https://api.chinob.xyz/v1.1/avatar-fetch/?placeId=0&userId=0","ClientTicket":"","GameId":"00000000-0000-0000-0000-000000000000","PlaceId":0,"BaseUrl":"http://assetgame.chinob.xyz/","ChatStyle":"Classic","CreatorId":0,"CreatorTypeEnum":"User","MembershipType":"None","AccountAge":0,"CookieStoreFirstTimePlayKey":"rbx_evt_ftp","CookieStoreFiveMinutePlayKey":"rbx_evt_fmp","CookieStoreEnabled":true,"IsUnknownOrUnder13":true,"GameChatType":"NoOne","SessionId":"{\"SessionId\":\"ea3b5165-d873-408f-844f-069125f5a2b5\",\"GameId\":\"00000000-0000-0000-0000-000000000000\",\"PlaceId\":0,\"ClientIpAddress\":\"207.241.225.226\",\"PlatformTypeId\":5,\"SessionStarted\":\"2020-07-31T00:11:14.6819405Z\",\"BrowserTrackerId\":0,\"PartyId\":null,\"Age\":null,\"Latitude\":37.751,\"Longitude\":-97.822,\"CountryId\":1,\"PolicyCountryId\":null,\"LanguageId\":null,\"BlockedPlayerIds\":null,\"JoinType\":\"Unknown\",\"PlaySessionFlags\":0,\"MatchmakingDecisionId\":null}","AnalyticsSessionId":"ea3b5165-d873-408f-844f-069125f5a2b5","DataCenterId":0,"UniverseId":0,"FollowUserId":0,"characterAppearanceId":0,"CountryCode":"US"}`)
})
app.post("/api/v1/users/login",async(req,res)=>{
    const user = await getUserByUsername(req.body.username)
    const pass = req.body.password
    if (!user) {
        return res.send("Incorrect username or password!")
    }
    const verified = await verify(user.password,pass)
    if (verified) {
        res.cookie(".ROBLOSECURITY", user.token,{
            httpOnly: true,
            secure: true,
            domain: ".chinob.xyz",
            maxAge: 1000 * 60 * 60 * 24 * 2000,
        })
        return res.redirect("/home")
    } else {
        return res.status(403).send("Incorrect username or password!")
    }
})

// app.get("/api/v1/tokens/settoken",(req,res)=>{
//     res.cookie(".ROBLOSECURITY", req.query.token,{
//         httpOnly: true,
//         secure: true,
//         domain: ".chinob.xyz"
//     })
//     res.json({success: true})
// })


module.exports = app;