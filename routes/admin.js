var express = require('express'),
    router = express.Router(),
    passport = require('passport')
    User = require('../models/user');

//backdoor

router.route('/login')
    .get((req, res)=>{
        res.render('login');
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
   
router.route('/register')
    .get((req, res)=>{
        res.render('register')
    })
    .post((req, res)=>{
        User.register(new User({username: req.body.username}), req.body.password, function(err) {
            if (err) {
                res.status(500).json({
                    title: 'Error!',
                    err: err
                })
                return
            }
            console.log('user registered!');
            res.redirect('/');
        });
    });


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