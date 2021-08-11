const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()


const port = process.env.PORT || 4400


app.get('', (req, res) => {


    res.json('well come to json web tokan')

})
const verifytoken = (req, res, next) => {
    const bearheader = req.headers['authorization']
    if (typeof bearheader !== 'undefined') {
        const bearer = bearheader.split(' ')
        const bearertoken = bearer[1]
        req.token = bearertoken
        next()
    } else {
        res.sendStatus(401);

    }
}
app.post('/', verifytoken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authdata) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json('post create successfulll !!!!!')
        }
    })


})
app.post('/login', (req, res) => {
    const user = {
        name: 'siraj',
        department: 'computer science'
    }


    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});

app.listen(port, () => {
    console.log(`server running on ${port}`);
})