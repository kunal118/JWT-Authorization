require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
const jwt = require('jsonwebtoken')
let posts = [
    {
        username: 'admin',
        title: 'Admin',
    },
    {
        username: 'blog',
        title: 'Blog',
    }
];
const refreshTokens = [];

app.post("/login",(req,res)=>{
    ///authenticate here
    //imp
    //imp
    const username = req.body.username
    const user = {name:username};
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken, refreshToken})
    
})

app.delete("/logout",(req, res) => {
    refreshTokens.splice(0,refreshTokens.length)
    res.send("Logged out of all sessions")
    
})

app.post("/token",(req,res)=>{
    console.log(refreshTokens);
    const refreshToken = req.body.token
    console.log(refreshToken);
    if(refreshToken == null)return res.sendStatus(401)
    console.log("done");
    if (!refreshTokens.includes(refreshToken))return res.sendStatus(403)
    console.log("done");
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err)return res.sendStatus(403)
       
        const accessToken = generateAccessToken({name: user.name})
        res.json(accessToken)
    })


      
})
function generateAccessToken(user) {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})
    
}


app.listen(4000,()=>{
    console.log('Server running at http://localhost:4000')
})
