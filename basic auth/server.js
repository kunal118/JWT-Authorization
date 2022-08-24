const express = require('express');
const app = express();
app.use(express.json())
const users = [
    {
        name:"name",
        password:"password"
    }
];

app.get('/users', (req, res) => {
    res.json(users);
})
app.post("/users", (req, res) => {
    console.log(req.body,req.query,req.query);
    users.push(req.body);
    res.json(users);
    
})
app.listen(3000,(req,res)=>{
    console.log('Server listening on port 3000');
})
    