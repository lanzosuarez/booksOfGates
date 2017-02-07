var IndexLib = {};

IndexLib.returnIndex = (function(){

    var books;
    function returnBookList(){
            if(window.location.pathname==='/'|| true){
            
            //GET BOOKS
            console.log("Hello im in index");
            $.ajax({    //GET BOOKS
                type: 'GET',
                url: 'api/v1/Book'
            }).done(function(r){
                books = r;
                $.ajax({
                    type: 'GET', //GET BOOK COUNT
                    url: 'api/v1/Book/count'
                }).done(function(r){
                    const count = r.count;
                    $('#bodySection').html('');
                    const bodySection = document.getElementById('bodySection'); //GET BODY SECTION
                    bodySection.insertAdjacentHTML('beforeend',     //THEN INSERT THIS TO BODYSECTION
                    `
                    <div class="columns"> <div class="column is-two-thirds center"> <div class="content"> <h4 align="justify"> "Never before have I felt so empowered to learn as I do today. When I was young, there were few options to learn on my own. My parents had a set of World Book Encyclopedias, which I read through in alphabetical order. But there were no online courses, video lectures, or podcasts to introduce me to new ideas and thinkers as we have today. Still, reading books is my favorite way to learn about a new topic. I’ve been reading about a book a week on average since I was a kid. Even when my schedule is out of control, I carve out a lot of time for reading. If you’re looking for a book to enjoy over the holidays, here are some of my favorites from this year. They cover an eclectic mix of topics—from tennis to tennis shoes, genomics to great leadership. They’re all very well written, and they all dropped me down a rabbit hole of unexpected insights and pleasures." </h4> </div></div></div><section class="hero"> <div class="hero-body"> <p align="center" class="title is-2">Favorite Books</p><div class="column is-one-quarter center"> <div class="content"> <h4 align="center">"Read and find ways to deliver the knowledge people need to live healthier lives and climb out of poverty."</h4> </div></div><div class="columns"> <div class="column is-one-third center"> <div class="nav-wrapper"> <form> <div class="input-field"> <input id="search" type="search" required=""/> <label for="search" class="label-icon"><i class="fa fa-search fsearch"></i></label> <i class="material-icons fsub">Search</i> </div></form> </div></div></div><div class="spacer"> <section class="hero"> <div class="hero-body"> <div class="container"></div></div></section> </div><div class="columns"> <div class="column is-two-thirds center"> <div id="sortDate" class="column"> <div class="is-left"><span class="title is-4 has-text-muted">${count} books</span> <span class="title is-3 has-text-muted">&nbsp;|&nbsp;</span> <a class="button is-primary new-btn">New</a></div><div class="ul rightUl"> <li class="link"><a href=""><span class="icon"><i class="fa fa-list"></i></span> <span>All</span></a></li><li class="link"><a href=""><span class="icon"><i class="fa fa-heart"></i></span> <span>Newest</span></a></li><li class="link"><a href=""><span class="icon"><i class="fa fa-th"></i></span> <span>Oldest</span></a></li></div></div><hr class="hr"/> </div></div><div class="spacer"></div><div class="component"> <ul id="bookList" class="align"></ul> </div></div></section>
                    `
                    );
                    
                    const bookList = document.getElementById('bookList'); //GET BOOKLIST LOCATION
                    books.forEach(function(book){
                        bookList.insertAdjacentHTML('beforeend',
                        `
                        <li> <figure class="book"> <ul class="hardcover_front"> <li><img src="${book.imageUrl}" alt="" id="imgBook"/><span class="ribbon bestseller">Nº1</span></li><li></li></ul> <ul class="page"> <li></li><li><a class="btn bookButton" id="${book._id}" >View More</a></li><li></li><li></li><li></li></ul> <ul class="hardcover_back"> <li></li><li></li></ul> <ul class="book_spine"> <li></li><li></li></ul> <figcaption id="style-4" class="content scrollbar"> <div class="container conBook"> <h1>${book.title}</h1> <span>${book.author}</span> <p>${book.description}</p></div></figcaption> </figure> </li>
                        `
                        );
                    });
                    listener();
                });
                 
            });  
        }
       
    }

    function listener(){
       $('a.bookButton').click(function(e){
           console.log($(this).attr("id"));
           pushState($(this).attr("id"));
       });
    }

    function pushState(id){
        window.history.pushState({content:$('#bodySection').html()},null,'/books/'+id);
        editLib.returnEditBook.returnBook();
    }

    return{
        returnBookList:returnBookList,
    }
}());


IndexLib.returnIndex.returnBookList();



