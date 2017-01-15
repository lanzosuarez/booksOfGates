var express = require('express');
var router = express.Router();

var Book = require('../models/books');

function handleError(){
   res.status(500).json({
       title: 'Error',
       error: err
   }); 
}

router.get('/json-books',(req, res)=>{
    Book.find((err, docs)=>{
        if(err){
            return res.status(500).json({
                title: 'Error getting messages',
                error: err
            });
        }
        res.send(docs);
    });
});

router.get('/new',(req, res)=>{ //new
        res.render('new')
});

router.get('/:id', (req, res)=>{ //per book
    res.render('book');
});

router.route('/edit/:id') //edit
    .get((req, res)=>{
        res.render('edit')
});

router.post('/delete/:id', (req, res)=>{
    res.send("delete");
});
    
module.exports = router;