$(function () {
    var $toggle = $('.nav-toggle');
    var $menu = $('.nav-menu');

    $toggle.click(function() {
      $(this).toggleClass('is-active');
      $menu.toggleClass('is-active');
    });

    // $('#bookImg').change(function(){
    //      console.log(($('#bookImg').val()));
    //       if(!$('#bookImg').val() || ""){
    //         window.alert("No photo was selected");
    //         e.preventDefault();
    //     }
    //     $.ajax({
    //         type: "POST",
    //         url: "/books/new",
    //     }).done(function (r) {
    //         console.log(r);
    //     });
    // });

    // var submitButton = $('#submitButton');
    // submitButton.bind('click', function(e){ 
    //     if(!$('#bookImg').val() || ""){
    //         window.alert("No photo was selected");
    //         e.preventDefault();
    //     }
    //     //  $.ajax({
    //     //     type: "POST",
    //     //     url: "/books/new",
    //     // }).done(function (r) {
    //     //     console.log(r);
    //     // });
    // });

    
    
    $('#login').click(function(e){
        var email = $('#email').val();
        var pass = $('#pass').val();
        console.log(email);
        console.log(pass)

        if(email==="" || pass===""){
            window.alert("Enter all your credentials");
            e.preventDefault();
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/admin/login",
            data: JSON.stringify({
                email: email,
                pass: pass
            }),
            contentType: 'application/json'
            }).done(function(r) {
                 if (typeof r.redirect == 'string'){
                    localStorage.setItem('token', r.token);
                    window.location = r.redirect;
                 }else{
                     const res = JSON.stringify(r);
                     window.alert(JSON.parse(res).title);
                     e.preventDefault();
                 }
            });
    });
});

