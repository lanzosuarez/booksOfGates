document.ready = (function () {
    
    let dataForm;
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
            window.alert("Enter all your credentials");
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

  // IF NO PHOTO COVER WAS SELECTED
    
    $('input[type=file]').change(function(e){
        e.stopPropagation(); // Stop stuff happening
        e.preventDefault();
        var files = e.target.files;
        console.log(files)
        var data = new FormData();
        $.each(files, function(key, value){
            data.append(key, value);
        });
        dataForm = data;
    });

    //FOR EDIT
        $('#editButton').click(function(e){
            if(!$('#bookImg').val()){
                window.alert("No photo cover was selected")
                e.preventDefault();
                return false;
            }
            e.stopPropagation(); // Stop stuff happening
            e.preventDefault();
            $.ajax({
                type:'POST',
                url: '/books/upload/',
                data: dataForm,
                processData: false,
                contentType: false,
                dataType: 'json'
            }).done(function(r){
                //window.alert(r.respo)
                //GET THE VALUE OF THE INPUTS
                $('#imageUrl').val(r.respo);
                var formData = {
                 title: $('#title').val(),
                 author: $('#author').val(),
                 imageUrl: $('#imageUrl').val(),
                 published: $('#published').val(),
                 description: $('#description').val(),
                 price: $('#price').val(),
                 link: $('#link').val(),
            }
                console.log(window.location.pathname); 
                $.ajax({
                    type: 'POST',
                    url: window.location.pathname,
                    data: formData,
                
                }).done(function(r){
                    window.alert(r.respo)
                });
            })
         
        });


    $('#back').click(function(){
            window.location = '/';
    });

   

}());

