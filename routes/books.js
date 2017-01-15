var express = require('express');
var router = express.Router();


var Book = require('../models/books');

var fileCounter = 1;

function handleError(){
   res.status(500).json({
       title: 'Error',
       error: err
   }); 
}

router.get('/json-books',(req, res)=>{
    Book.find((err, docs)=>{
        if(err){
           return this.handleError();
        }
        res.send(docs);
    });
});

router.get('/new',(req, res)=>{ //new
        res.render('new')
});
router.post('/new', (req, res)=>{
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var image = req.files.myImage;
    console.log(image);
    // var imageUrl = 'public/uploads/bookImage'+fileCounter+'.jpg';
    // image.mv(imageUrl,(err)=>{
    //     if (err) {
    //         this.handleError();
    //     }

    //     fileCounter++; 
    // });  
});



router.get('/:id', (req, res)=>{ //per book
    Book.findById(req.params.id, (err, book)=>{
        if(err){
            return this.handleError();
        }
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        res.render('book',{
            book: book,
            favYear: book.published.match(/(\d{4})/)[0],
            month: monthNames[book.createDate.getMonth()]
        })
    });
});

router.route('/edit/:id') //edit
    .get((req, res)=>{
        res.render('edit')
});

router.post('/delete/:id', (req, res)=>{
    Book.findById(req.params.id, (err, book)=>{
        if(err){
           this.handleError();
        }
        book.remove((err, result)=>{
            if(err){
              this.handleError();  
            }
            res.redirect('/');
        });
    });
});
    
module.exports = router;