const express = require('express')
const bodyParser = require('body-parser')
const _config = require('./config')

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const app = express()

app.use(bodyParser.urlencoded({ extended : true}))
app.set('view engine','ejs')

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

app.route('/edit/:id')
    .get((req,res) => {
        var id = req.params.id
        db.collection('users').find(ObjectId(id)).toArray((err,result) => {
            if(err) return res.send(err)
            res.render('edit.ejs', {data: result})
        })
    })
    .post((req,res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname
        db.collection('users').updateOne({_id: ObjectId(id)}, {
            $set : {
                name: name,
                surname: surname
            }
        },(err,result) => {
            if(err) return res.send(err)
            res.redirect('/show')
            console.log('BD updated!!')
        })
    })

app.route('/delete/:id')
    .get((req,res) => {
        var id = req.params.id
        db.collection('users').deleteOne({_id: ObjectId(id)}, (err,result) => {
            console.log('Deleted... :(')
            res.redirect('/show')
        })
    })