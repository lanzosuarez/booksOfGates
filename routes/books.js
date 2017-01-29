var express = require('express'),
    router = express.Router(),
    Book = require('../models/books'),
    uuid = require('uuid/v4'),
    fs = require('fs');

var imgUrl=''; //URL FOR PICTURE UPLOAD

function deletePrev(file){
    var path = './public'+file
    fs.exists(path, (exists)=>{
        if(exists){
            return fs.unlink(path, (err)=>{
                if(err) {return console.log(err)}
                console.log("deleted")
            }); 
        }
    })
}

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
  if(!req.isAuthenticated()){
    return res.redirect('/admin/login')
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


function extractErrrors(err){
    var eArr=[];
    for(var e of Object.keys(err.errors)){
            eArr.push(e);
    }
    return eArr;
}

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
            if(err){return res.send(err)} 
            if(req.body.isChanged===true){ //CHECK IF NEW PICTURE WAS UPLOADED
                if(!book.imageUrl.match(/(https:\/\/)/)){ //CHECK IF THE URL OF THE IMAGE DOESNT START WITH AN HTTP
                    console.log("reached")
                    deletePrev(book.imageUrl)   //THEN DELETE THE PREVIOUS BOOKCOVER
                }
            }
            //SET THE BOOK DETAILS ACC. TO THE FORM SENT
            book.link = req.body.link;
            book.title = req.body.title;
            book.author = req.body.author;
            book.published = req.body.published;
            book.price = req.body.price;
            book.description = req.body.description;
            book.imageUrl = req.body.imageUrl;
            book.updateDate = Date.now();
            book.save((err, book)=>{
                console.log("reached")
                if(err){ 
                    var e = extractErrrors(err);
                    return res.send({
                        success: false,
                        respo: e,
                        respoObj: err
                    });
                }
                console.log(book)
                res.send({
                    success:true,
                    respo: 'Success!'
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

//get bookcover URL
router.get('/bookCover/:id',(req, res)=>{
    Book.findById(req.params.id, (err, book)=>{
        if(err) return res.send({
            success: false,
            respo: 'Something went wrong. Please try again'    
        })
        res.send({
            success: true,
            respo: book.imageUrl
        })
    })
})


//ROUTE FOR NEW BOOK
router.route('/new')
    .get((req ,res)=>{
        res.render('new');
    })
    .post((req, res)=>{
        console.log("Reached")
        // \w+\.\w+
        console.log(req.body)
        var book = new Book({ //CREATE NEW BOOK INSTANCE
            link: req.body.link,
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            createDate: Date.now(),
            updateDate: Date.now()
        }).save((err, doc)=>{ //SAVE BOOK
            if(err){
                deletePrev(req.body.imageUrl);
                console.log(err)//
                var e = extractErrrors(err);
                return res.send({
                    success: false,
                    respo: e.reverse(),
                    respoObj: err
                });
            }
            //console.log("Second level")
            res.status(201).send({
                success: true,
                redirect: "/"
            });
        })
    });
    
module.exports = router;

     
     
