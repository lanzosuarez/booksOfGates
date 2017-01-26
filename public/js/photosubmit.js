 document.ready = (function(check){
    console.log(check);
    $('#back').click(function(){
            window.location = '/';
    });

    document.getElementById("bookImg").onchange = function () {
    var reader = new FileReader();
    
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("image").src = e.target.result;
    };
    
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
    };
 });