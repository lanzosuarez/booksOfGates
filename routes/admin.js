var express = require('express'),
    router = express.Router(),
    passport = require('passport')
    User = require('../models/user');

//backdoor

router.route('/login')
    .get((req, res)=>{
        res.render('register');
    })
    .post((req, res)=>{
        //console.log(req.body)
        User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
            if (err) return res.status(500).json({error:err})
            if (user === false) {
                res.send({
                    message: options.message,
                    success: false
                });
            } else {
                req.login(user, function (err) {
                    if (err) return res.status(500).json({error:err});
                    console.log(req.user)
                    console.log(req.session)
                    res.send({
                        success: true,
                        user: user,
                        redirect:'/'
                    });
                });
            }
        });
    })


function extractErrrors(err){
    var eArr=[];
    if(err.errors){
        for(var e of Object.keys(err.errors)){
            eArr.push(err.errors[e].message)
        }
       
        return eArr.reverse();
    }
    return err;
}

router.post('/register',(req, res)=>{
    if(req.body.c_pass !== req.body.password){
        return res.send({
            success:false,
            respo: ['Password does not match']
        });
    }
    User.register(new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }), req.body.password, function(err) {
        if (err) {
            var e = extractErrrors(err);
            console.log(e);
            return res.send({
                success: false,
                respo: e,
            });
            console.log(err);

        }
        console.log('user registered!');
        res.send({
            success:true,
            respo:'/admin/login'
        });
    });
});

router.get('/user', (req, res)=>{
    if(!req.user)return res.send({respo:false})
    res.send({respo:true});
})



router.use((req, res, next)=>{
  if(!req.isAuthenticated()){
     return res.redirect('/admin/login')
  }
  next();
});


router.get("/logout", (req, res)=>{
    req.logout();
    req.session.destroy()
    res.redirect('/')
}); 

module.exports = router;