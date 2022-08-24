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

app.get('/posts',authenticateToken,(req,res)=>{
    console.log(req.user.name);
    t = posts.filter(post=>{return post.username == req.user.name})
    res.json(t)
})

function authenticateToken(req,res,next)
{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if(token == null)return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)res.sendStatus(401)
        
        req.user = user
        next();
    })



}
app.listen(3000,()=>{
    console.log('Server running at http://localhost:3000')
})
