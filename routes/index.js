var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

var Book = require('../models/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = localStorage.getItem('token')?'?token='+localStorage.getItem('token'):''
  Book.find((err, docs)=>{
        if(err){
            return res.status(500).json({
                title: 'Error getting messages',
                error: err
            });
        }
        res.render('index', { 
            books: docs,
            token:token
        });
    });
});

//pwede ka na mag forech sa loob ng index.jade

module.exports = router;
