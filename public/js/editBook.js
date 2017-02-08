var editLib = editLib || {};
 editLib.returnEditBook = (function(){
    var state;
    const urlRegex= /^\/books\/\d+\w+$/;
    const bookIdRegex = /\/\d+\w+/;
    function returnBook(){
        
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        //favYear: book.published.match(/(\d{4})/)[0],
        //month: monthNames[book.createDate.getMonth()],

        if(urlRegex.test(window.location.pathname)){
            
            function getUserPart(book, user){
                return user?`<div class="column editButton">
                                        <a id="edit" href="/books/edit/${book._id}" class="button is-primary">Edit Book</a>
                                        <a id="delete" href="/books/delete/${book._id}" class="button is-danger">Delete</a>
                                    </div>`:'';
            }

            console.log("Im on edit book");
            console.log(window.location.pathname.match(bookIdRegex)[0].slice(1));
            var id = window.location.pathname.match(bookIdRegex)[0].slice(1);
            var user;
            const bodySection = document.getElementById('bodySection');
            bodySection.insertAdjacentHTML('beforeend','<div class="loadme"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div></div>');
            $.ajax({
                type: 'GET',
                url: '/admin/user'
            }).done(function(r){
                user=r.respo;
                console.log(r.respo)
            });

            $.ajax({
                type: 'GET',
                url: '/api/v1/Book/'+id
            }).done(function(r){
                document.title=r.title;
                const book=r;
                    transformedDate = new Date(book.createDate),
                    //favYear = book.published.match(/(\d{4})/)[0],
                    month = monthNames[transformedDate.getMonth()],
                    date = month+" " + transformedDate.getDate() + ", " + transformedDate.getFullYear(),
                    update = Math.ceil((Date.now()- new Date(book.updateDate))/86400000),
                    day = update>1?'days':'day';
                    userPart= getUserPart(book,user);   
                
                console.log(r)
                var location = document.getElementById('bodySection');
                $('#bodySection').html('');
                IndexLib.returnIndex.insertUpperPart();
                document.getElementById('afterHeading').insertAdjacentHTML('beforebegin','<div class="column is-two-thirds center"><hr class="hr"></hr></div>')
                $('#afterHeading').remove();
                location.insertAdjacentHTML('beforeend',
                    `
                    <div class="section new-header"> <div class="container"> <div class="columns"> <div class="column"></div></div></div></div><div class="section viewBook"> <div class="container"> <div class="columns"> <div class="column is-3"> <div class="container marginb"> <ul class="align2"> <li> <figure class="book"> <ul class="hardcover_front"> <li><img src="${book.imageUrl}" alt="" id="imgBook"/><span class="ribbon bestseller">N�1</span></li><li></li></ul> <ul class="page"> <li></li><li></li><li></li><li></li><li></li></ul> <ul class="hardcover_back"> <li></li><li></li></ul> <ul class="book_spine"> <li></li><li></li></ul> </figure> </li></ul> <div class="container"></div>${userPart}</div></div><div class="column is-8 is-offset-1"> <div class="title is-2 is-black">${book.title}</div><p class="title is-3 has-text-muted">${book.price}</p><hr/><br/> <h6 align="justify" class="subtitle is-black is-height">${book.description}</p><br/><br/><br/> <table class="table"> <tbody> <tr> <td class="has-text-right"><strong class="is-bl">Amazon Link</strong></td><td class="is-tdsize">${book.link}</td></tr><tr> <td class="has-text-right"><strong class="is-bl">Year Published</strong></td><td class="is-tdsize">${book.published}</td></tr><tr> <td class="has-text-right"><strong class="is-bl">Date Created</strong></td><td class="is-tdsize">${date}</td></tr><tr> <td class="has-text-right"><strong class="is-bl">Date Updated</strong></td><td class="is-tdsize">${update} ${day} ago</td></tr><tr></tr></tbody> </table> </div></div></div></div>
                    `         
                    );
            });
        }
    }

    return {
        returnBook:returnBook,
        urlRegex:urlRegex
      
    }
}());

editLib.returnEditBook.returnBook();

//LISTEN FOR POPSTATES
window.addEventListener('popstate', function(e){
    console.log(location.pathname);
    var path = location.pathname;
    if(path==="/"){
        console.log("hello")
        IndexLib.returnIndex.returnBookList();
    }
    if(editLib.returnEditBook.urlRegex.test(path)){
        editLib.returnEditBook.returnBook();
    }
    if(IndexLib.returnIndex.testIfSearch(path+location.search)){
        var locSearch = decodeURIComponent(location.search); //get the uri then decode it
        var s = locSearch.slice(locSearch.indexOf('=')+1); //get the query string
        console.log("decoded uri:"+ s);
        $('input[type=search]').val(s);
        IndexLib.returnIndex.startSearch(s); //then search again.
    }
});