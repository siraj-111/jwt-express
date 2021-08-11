const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
const Port = process.env.PORT || 4500

app.get('/', (req, res) => {
    res.send('well come to Jwt')
})

const verify = (req, res, next) => {
    const bearerheader = req.headers['authorization']
    if (typeof bearerheader !== 'undefined') {
        const bearer = bearerheader.split(' ')
        const bearertoken = bearer[1]
        req.token = bearertoken
        next()
    } else {
        res.sendStatus(401)
    }
}
posts = [
    { title: 'abc', body: 'this is first post' },
    { title: 'def', body: 'this is second post' },
    { title: 'gh', body: 'this is third post' },
    { title: 'ij', body: 'this is fourth post' },
]

app.get('/posts', verify, (req, res) => {
    jwt.verify(req.token, 'sercretKEy', (err, auth) => {
        if (err) res.send(err)
        res.json(posts)
    })

})
app.get('/post', verify, (req, res) => {
    const name = req.body.name

    jwt.verify(req.token, 'sercretKEy', (err, auth) => {
        if (err) {
            res.send(err)
        } else {



            res.json(name)
        }

    })

})


app.post('/login', (req, res) => {
    jwt.sign({
        user: 'siraj'
    }, "sercretKEy", (err, token) => {
        res.json({
            token: token
        })
    })
})

app.listen(Port, () => {
    console.log(` server running ${Port}`);
})