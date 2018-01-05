var express = require ('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var app = express()

var User = require('./models/user.js')

mongoose.Promise = Promise


var posts = [
    {message: 'hello'},
    {message : 'hi'}
]

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req,res) => {         // URL will to go this route
    res.send(posts)
})

app.get('/users', async (req,res) => {         // URL will to go this route
 try{
         var users = await User.find({}, '-pwd -__v')
         res.send(users)
 }catch (error){
     console.error(error)
     res.sendStatus(500)
 }   


})

app.get('/profile/:id', async (req,res) => {         // URL will to go this route
    try{
            var user = await User.findById(req.params.id, '-pwd -__v')
            res.send(user)
    }catch (error){
        console.error(error)
        res.sendStatus(500)
    }   
   
   
   })




app.post('/register', (req,res) => {         // URL will to go this route
    var userData = req.body

    var user = new User(userData)

    user.save((err, result) => {
        if(err)
            console.log('saving user error')
        res.sendStatus(200)
    })
})

app.post('/login', async (req,res) => {      
    var userData = req.body

   var user = await User.findOne({email: userData.email })  //any user find with findOne will be set in user variable
  
    if(!user) 
        return res.status(401).send({message: 'Email or Password invalid'})
    
    if(userData.pwd != user.pwd)
        return res.status(401).send({message: 'Email or Password invalid'})

    var payload = {}
  
    var token  = jwt.encode(payload, '123')
  
   res.status(200).send({token})
})

mongoose.connect('mongodb://test:test@ds239587.mlab.com:39587/socaiapp',(err) =>{
    if(!err)
        console.log('connected successfully to monoDB')
})

app.listen(3000)
 