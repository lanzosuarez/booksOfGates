var express = require('express'),
    router = express.Router(),
    Book = require('../models/books'),
    fs = require('fs');

function deletePrev(file){
    var path = './public'+file
    fs.exists(path, (exists)=>{
        if(exists){
            return fs.unlink(path, (err)=>{
                if(err) {return console.log(err)}
                console.log("deleted")
            }); 
        }
    });
}

function extractErrrors(err){
    var eArr=[];
    for(var e of Object.keys(err.errors)){
            eArr.push(e);
    }
    return eArr;
}


router.route('/')
    .get((req ,res)=>{
        console.log("dsdas")
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
            price: req.body.price,
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