var express = require('express');
var router = express.Router();
var Book = require('../models/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.route('/search')
    .get(function(req,res){
        res.render('search')
    })

module.exports = router;
