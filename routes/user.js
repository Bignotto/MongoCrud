
/*
USER Route

get /user/show - list all users
post /user/show - save info into database
*/
const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

router.post('/show',(req,res) => {
    db.collection('users').insertOne(req.body, (err,result) => {
        if(err) return console.log(err)

        console.log('saved into database!')
        res.redirect('/')
        db.collection('users').find().toArray((err,results) => {
            console.log(results)
        })
    })
})

router.get('/show', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

router.route('/edit/:id')
    .get((req,res) => {
        let id = req.params.id
        db.collection('users').find(ObjectId(id)).toArray((err,result) => {
            if(err) return res.send(err)
            res.render('edit.ejs', {data: result})
        })
    })
    .post((req,res) => {
        let id = req.params.id
        let name = req.body.name
        let surname = req.body.surname
        db.collection('users').updateOne({_id: ObjectId(id)}, {
            $set : {
                name: name,
                surname: surname
            }
        },(err,result) => {
            if(err) return res.send(err)
            res.redirect('/user/show')
            console.log('BD updated!!')
        })
    })

router.route('/delete/:id')
    .get((req,res) => {
        let id = req.params.id
        db.collection('users').deleteOne({_id: ObjectId(id)}, (err,result) => {
            console.log('Deleted... :(')
            res.redirect('/user/show')
        })
    })

module.exports = router