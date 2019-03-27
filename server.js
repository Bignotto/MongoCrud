const express = require('express')
const bodyParser = require('body-parser')
const _config = require('./config')

const MongoClient = require('mongodb').MongoClient;

const user = require('./routes/user')

const app = express()

app.use(bodyParser.urlencoded({ extended : true}))
app.set('view engine','ejs')

app.use('/user',user)

MongoClient.connect(_config.dbUrl, { useNewUrlParser: true } ,(err, client) => {
    if(err) return console.log(err)
    db = client.db('authtest')

    app.listen(3000,function(){
        console.log('Server is UP on port 3000.')
    })
})

app.get('/', (req,res) => {
    res.render('index.ejs')
})
// app.get('/', (req, res) => {
//     var cursor = db.collection('users').find()
// })

