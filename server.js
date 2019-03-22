const express = require('express')
const bodyParser = require('body-parser')
const _config = require('./config')

const MongoClient = require('mongodb').MongoClient;
const app = express()

app.use(bodyParser.urlencoded({ extended : true}))
app.set('view engine','ejs')

MongoClient.connect(_config.dbUrl, (err, client) => {
    if(err) return console.log(err)
    db = client.db('authtest')

    app.listen(3000,function(){
        console.log('Server is UP on port 3000.')
    })
})

app.get('/', (req,res) => {
    res.render('index.ejs')
})
app.get('/', (req, res) => {
    var cursor = db.collection('users').find()
})

app.post('/show',(req,res) => {
    db.collection('users').insertOne(req.body, (err,result) => {
        if(err) return console.log(err)

        console.log('saved into database!')
        res.redirect('/')
        db.collection('users').find().toArray((err,results) => {
            console.log(results)
        })
    })
})

app.get('/show', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})