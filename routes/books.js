var express = require('express'),
    router = express.Router(),
    Book = require('../models/books');

router.get('/:id', (req, res, next)=>{ //per book
    if(typeof(req.params.id)==="string") return next();
    Book.findById(req.params.id, (err, book)=>{
        if(err){
            res.status(500).json({
                title: 'Error',
                error: err
            }); 
            return;
        }
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        
        res.render('book',{
            book: book,
            favYear: book.published.match(/(\d{4})/)[0],
            month: monthNames[book.createDate.getMonth()],
        })
    });
});

//MIDDLEWARE FOR UNAUTHORIZED REQUESTS
router.use((req, res)=>{
    if(!req.user){ //IF REQ.USER IS FALSE
        return res.redirect('/'); //REDIRECT TO HOMEPAGE
    }
    next();
});

//ROUTE FOR NEW BOOK
router.route('/new')
    .get((req ,res)=>{
        res.render('new');
    })
    .post((req, res)=>{
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
        })
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

     
     
