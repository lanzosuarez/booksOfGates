var express = require('express');
var router = express.Router();

var Book = require('../models/books');

function handleError(){
   res.status(500).json({
       title: 'Error',
       error: err
   }); 
}

router.route('/json-books')
    .get((req, res)=>{
        Book.find()
        .exec((err, docs)=>{
            if(err){
                return res.status(500).json({
                    title: 'Error getting messages',
                    error: err
                });
            }
            res.send(docs);
        });
    })
    .post((req, res)=>{

    let book = new Book({
        link: req.body.link,
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        createDate: new Date()
    });
    book.save((err, book)=>{
        if(err){
            return this.handleError();
        }
        res.status(200).json({
            title: 'Message Saved!',
            obj: book
            });
    });
});

module.exports = router;