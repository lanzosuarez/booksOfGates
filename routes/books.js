var express = require('express'),
    router = express.Router(),
    Book = require('../models/books'),
    uuid = require('uuid/v4'),
    fs = require('fs');

var imgUrl=''; //URL FOR PICTURE UPLOAD

router.get('/:id', (req, res, next)=>{ //per book
    Book.findById(req.params.id, (err, book)=>{
        if(err) return next();
        if(!book) return res.send(err);

        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        
        res.render('book',{
            book: book,
            favYear: book.published.match(/(\d{4})/)[0],
            month: monthNames[book.createDate.getMonth()],
        });
    });
});

//MIDDLEWARE FOR UNAUTHORIZED REQUESTS
router.use((req, res, next)=>{
    if(!req.user){ //IF REQ.USER IS FALSE
        return res.redirect('/'); //REDIRECT TO HOMEPAGE
    }
    next();
});

router.delete("/:id", (req, res, next)=>{
    Book.findById(req.params.id, (err, book)=>{
        if(err) return next();
        res.send({
            redirect:'/'
        });
    });
});


router.route('/edit/:id')
    // ALL REQUEST WILL START FROM HERE
    .all((req, res, next)=>{
        //FIND THE BOOK
        Book.findById(req.params.id, (err, book)=>{
            if(err) return res.send(err)
            res.locals.book = book
            next();
        });
    })
    .get((req, res)=>{
        res.render('edit');
    })
    .post((req, res)=>{
        Book.findById(req.params.id, (err, book)=>{
            if(err) return res.send(err) 
            //SET THE BOOK DETAILS ACC. TO THE FORM SENT
            book.link = req.body.link;
            book.title = req.body.title;
            book.author = req.body.author;
            book.published = req.body.published;
            book.description = req.body.description;
            book.imageUrl = req.body.imageUrl;
            book.updateDate = Date.now();
            book.save((err, book)=>{
                if(err){ return res.send({
                        success: false,
                        respo: err
                    });
                }
                console.log(book)
                res.send({
                    success:true,
                    respo: 'yes'
                });
            });
        });
    });

/// PHOTO UPLOAD
router.post('/upload', (req, res)=>{
    if(!req.files) return res.send({
        respo: 'No photo was selected'
    })
    var nf = req.files['0']
    imgUrl='/uploads/'+uuid()+'.png'
    nf.mv('public'+imgUrl, (err)=>{
        if (err) console.log(err)
        res.send({
            success:true,
            respo: imgUrl
        })
    });
});
    
//ROUTE FOR NEW BOOK
router.route('/new')
    .get((req ,res)=>{
        res.render('new');
    })
    .post((req, res)=>{
        // \w+\.\w+
        //console.log(req.files)
        var book = new Book({ //CREATE NEW BOOK INSTANCE
            link: req.body.link,
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
            description: req.body.description,
            imageUrl: req.imageUrl,
            createDate: Date.now(),
            updateDate: Date.now()
        });
        book.save((err, doc)=>{ //SAVE BOOK
            if(err){ //IF THERE ARE ERRORS
                var eArr = [];
                for(var e of Object.keys(err.errors)){ 
                    eArr.push(e);
                }
                if(eArr.length===1){ //CHECK IF THERES ONLY ONE ERROR
                     return res.status(500).json({
                         title: 'Invalid '+eArr[0],
                         error:{
                             message: err.errors[eArr[0]].message //THEN RESNPOND WITH THE ERROR
                         }
                    });
                }
                else if(eArr.length>1){ //IF ERRORS ARE GREATER THAN ONE
                    return res.status(500).json({
                        title: 'Multiple Errors', //SEND MULTILE ERROR ERRORS
                        error:{
                            message: "Error saving. Kindly check your form"
                        }
                    });
                }
            }
            res.status(201).json({
                redirect: "/"
            });
        })
    });
    
module.exports = router;

     
     
