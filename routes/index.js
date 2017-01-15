var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find((err, docs)=>{
        if(err){
            return res.status(500).json({
                title: 'Error getting messages',
                error: err
            });
        }
        res.render('index', { books: docs });
    });
});

module.exports = router;
