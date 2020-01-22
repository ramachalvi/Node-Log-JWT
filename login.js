const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 2121;

app.post('/api/sign', (req, res) => {
    const user ={
        id: 1,
        username: "rama",
        email: "rama@gmail"
    }

jwt.sign({user}, 'SuperSecRetKey', {
    expiresIn: 10 * 10}, (err, token) => {
            res.json({token});
        })
}) 

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split('');
        
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403)
    }
}


app.get('/api', (req, res) => {
    res.json({
        msg: "alhamdulillah"
    })
})

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else {
            res.json({
                msg: "berhasil",
                authData
            })
        }
    })
})
    

app.listen(PORT, () => 
    console.log('Server is running at port ')
    )