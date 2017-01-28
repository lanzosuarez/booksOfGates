document.ready = (function () {
    
  
    var $toggle = $('.nav-toggle');
    var $menu = $('.nav-menu');

    $toggle.click(function() {
      $(this).toggleClass('is-active');
      $menu.toggleClass('is-active');
    });

  
    // VALIDATION FOR FOR LOGIN
    $('#login').click(function(e){
        var email = $('#email').val();
        var pass = $('#password').val();
        // console.log(email);
        // console.log(pass)

        if(email==="" || pass===""){
            //window.alert("Enter all your credentials");
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
            else window.alert(r.message);
        });
    });


    // $('#back').click(function(){
    //         window.location = '/';
    // });

   

}());

