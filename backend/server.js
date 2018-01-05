var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var bcyrpt = require('bcrypt-nodejs')
var app = express()

var User = require('./models/user.js')
var Post = require('./models/post.js')
var auth = require('./auth.js')

mongoose.Promise = Promise



app.use(cors())
app.use(bodyParser.json())


function checkAuthenticated(req,res, next) {
    if(!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized: Missing Auth Header'})


     var token = req.header('authorization').split(' ')[1]

    var payload = jwt.decode(token, '123')

    if(!payload)
          return res.status(401).send({message: 'Unauthorized: Auth Header Invalid'})

    req.userId = payload.sub      
     

     next()   
}


app.get('/posts/:id', async (req, res) => {         // URL will to go this route
    var author = req.params.id
    var posts = await Post.find({author})
    res.send(posts)
})


app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.author = req.userId


    var post = new Post(postData)

    post.save((err, result) => {
        if (err){
            console.error('saving post  error')
            return res.status(500).send({message: 'saving post error'})
        }


        res.sendStatus(200)
    })
})





app.get('/users', async (req, res) => {         // URL will to go this route
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }


})

app.get('/profile/:id', async (req, res) => {         // URL will to go this route
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }


})




mongoose.connect('mongodb://test:test@ds239587.mlab.com:39587/socaiapp', (err) => {
    if (!err)
        console.log('connected successfully to monoDB')
})


app.use('/auth', auth.router)
app.listen(3000)
