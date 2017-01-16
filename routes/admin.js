var express = require('express'),
    router = express.Router();
    jwt = require('jsonwebtoken');
    bcrypt = require('bcryptjs');
    User = require('../models/user');
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');



 

// router.get('/reg', (req, res)=>{
//     res.render('reg');
// })
// router.post('/reg', (req, res)=>{
//     var user  = new User({
//         password: bcrypt.hashSync(req.body.password,10),
//         email: req.body.email
//     });
//     user.save((err, user)=>{
//         if(err){
//             return res.send(err);
//         }
//         res.send("ok");
//     });
// })


router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', (req, res)=>{
    console.log(req.body.email)
    User.findOne({email: req.body.email}, (err, user)=>{   
        if(err){
            return res.send({ //internal server error
                title: 'Login Failed!',
            });
        }
        if(!user){
            return res.send({ //OK
                title: 'Login Failed!',
            });
        }
        if(!bcrypt.compareSync(req.body.pass, user.password)){
            return res.send({ //unauthorized
                title: 'Login Failed!',
            });
        }
        var token = jwt.sign({ user: user }, 'secret', {expiresIn: '1h'}); //create a token expires in an hour
            localStorage.setItem('token', token);
            res.send({
                redirect: '/',
                token: token,
            })
    });
});

module.exports = router;