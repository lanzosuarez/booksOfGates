document.ready=(function(){

    var editButton = $('button#editButton')[0];
    if(editButton){
        console.log("what");
        $.ajax({
            type:'GET',
            url: '/books/bookCover/'+window.location.pathname.match(/(\w+\d+\w+)/)[0]
        }).done(function(r){
            //console.log(r)
            //console.log($('#bookImg')[0].parentNode);
            if(r.success){
                var book = $('#bookImg')[0].parentNode;
                var path = r.respo;
                book.setAttribute('style', 'background-image: url('+path+');');
                book.classList.add('photo_submit--image');
            }
            else{
                window.alert(r.respo)
            }
        });  
    }
}());



//localhost:3000/books/cover/32324sas5asa56s6as6s6sa6