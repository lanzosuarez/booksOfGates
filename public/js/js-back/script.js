document.ready = (function () {
    var $toggle = $('.nav-toggle');
    var $menu = $('.nav-menu');

    $toggle.click(function() {
      $(this).toggleClass('is-active');
      $menu.toggleClass('is-active');
    });

    function disableLoginButton(val){
         $('#loginButton').attr('disabled', val);
    }
    
    $('#emailLogin').focus(function(){
        $('#emailLogin').removeClass('invalid');
    })

    $('#passwordLogin').focus(function(){
        $('#passwordLogin').removeClass('invalid');
    })

    //check
    $("#emailLogin").focusout(function(){
        var email = document.getElementById('emailLogin');
        var pass = document.getElementById('passwordLogin')
        if(email.classList.contains('invalid')){
            disableLoginButton(true);
        }
        else{
            disableLoginButton(false);
        }
    });

    // VALIDATION FOR FOR LOGIN
    $('#loginButton').click(function(e){
        var email = $('#emailLogin').val();
        var pass = $('#passwordLogin').val();
        console.log(email);
        console.log(pass)

        if(email===""){
            $('#emailLogin').addClass('invalid');
            $('#passwordLogin').addClass('invalid');
            e.preventDefault();
            return false;
        }
        if(pass===""){
            $('#passwordLogin').addClass('invalid');
            e.preventDefault();
            return false;
        }
        
        $.ajax({
            type: "POST",
            url: "/admin/login",
            data: JSON.stringify({
                username: email,
                password: pass
            }),
            contentType: "application/json"
        }).done(function (r) {
            if(r.success){
                var email = $('#email').val("");
                var pass = $('#password').val("");
                window.location = r.redirect;
            }
            else{
                   console.log(r);
                   window.alert(r.message);
            } 
        });
    }); 

    // $('#back').click(function(){
    //         window.location = '/';
    // });
   $('#price').priceFormat({
       prefix: '$'
   });
}());
    
  


   



