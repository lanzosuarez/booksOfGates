 document.ready = (function () {
       
    let dataForm;
    var newEntry=false;
    var isChanged=false;

    $('#bookImg').change(function(){
        console.log($('#bookImg').val());
        console.log($('#imageUrl').val());
        isChanged = true;
    })

    //PREP FILES TO BE UPLOADED
    $('input[type=file]').change(function(e){
            e.stopPropagation(); // Stop stuff happening
            e.preventDefault();
            var files = e.target.files; //GET THE TARGET FILES
            console.log(files)
            var data = new FormData(); //CREATE NEW FORM DATA INSTANCE
            $.each(files, function(key, value){
                data.append(key, value); //APPEND THE FILE IN FORMDATA
            });
            dataForm = data;
        });

    //ready form data
    function upload(r,e){
        e.stopPropagation(); // Stop stuff happening
        e.preventDefault();
        if(r)$('#imageUrl').val(r.respo); //SET IMAGE URL TO RESPONSE IMAGE URL
        
        var formData = {
            title: $('#title').val(),
            author: $('#author').val(),
            imageUrl: $('#imageUrl').val(),
            published: $('#published').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            link: $('#link').val(),
            isChanged: isChanged
        }
        console.log(window.location.pathname); 
        //UPLOAD
        $.ajax({
            type: 'POST',
            url: window.location.pathname,
            data: formData,
        
        }).done(function(r){
            isChanged=false; //IS SET IS CHANGED TO FALSE
            if(r.redirect){
                return window.location = r.redirect
            }
            if(r.error){
               return window.alert(r.title)
            }
        });  
    } 

    function getUrl(e){ 
        e.stopPropagation(); // Stop stuff happening
        e.preventDefault();
        //THEN START UPLOADING
        $.ajax({
            type:'POST',
            url: '/books/upload/',
            data: dataForm,
            processData: false,//
            contentType: false,//
            dataType: 'json'
        }).done(function(r){
            //after uploading EDIT FORM. r contains the imageUrl
            upload(r,e);
        });
    }
        
    //FOR EDIT
    $('#editButton').click(function(e){
        if(isChanged){
            console.log("upload and edit")
            getUrl(e);
        }else{
            console.log("Just edit")
            upload(null,e);
        }
    });

     $('#submitButton').click(function(e){
        newEntry=true
        if(!$('#newBookImg').val()){
            window.alert("No photo cover was selected")
            e.preventDefault();
            return false;
        }
        getUrl(e)
        //e.preventDefault();

    });

    var form = $('input[type=text]');
    //console.log(form.length)
    for(let x=0;x<form.length;x++){
        //console.log(form[x])
        form[x].addEventListener('change',function(){
            //console.log(this)
            if(form[x].value==""){
                form[x].classList.add('error');
                //console.log(form[x].className);
            }
            else{
                form[x].classList.remove('error');
            }
        });
        form[x].addEventListener('keyup',function(){
            //console.log(this)
            if(form[x].value==""){
                form[x].classList.add('error');
                //console.log(form[x].className);
            }
            else{
                form[x].classList.remove('error');
            }
        })  
    }

    

 }());