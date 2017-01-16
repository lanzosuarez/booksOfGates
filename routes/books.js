var express = require('express'),
    router = express.Router(),
    Chance = require('chance'),
    LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


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
           return this.handleError();
        }
        res.send(docs);
    });
});

router.get('/new',(req, res)=>{ //new
        var token = localStorage.getItem('token')?'?'+localStorage.getItem('token'):''
        res.render('new',{
            token:token
        })
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

router.use('/',(req, res, next)=>{
    jwt.verify(req.query.token, 'secret',(err, decoded)=>{
        if(err){
            return res.send({
                redirect:'/admin/login'
            });
        }
        next();
    })
})

router.post('/new', (req, res)=>{

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var image = req.files.myImage;
    var imgName = new Chance().zip()
    var imageUrl = 'public/uploads/bookImage'+imgName+'.jpg';
    var url = '/uploads/bookImage'+imgName+'.jpg';
    image.mv(imageUrl,(err)=>{
        if (err) {
            this.handleError();
        }
        fileCounter++;      
    }); 
    var book = new Book({
        link: req.body.link,
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        imageUrl: url,
        price: req.body.price,
        createDate: Date.now()
    });

    book.save((err, book)=>{
        if(err){
            this.handleError();
        }
        res.status(201).json({
            title: 'Book is saved',
            book: book
        })
    })
});

router.get('/edit/:id',(req, res)=>{ //edit
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