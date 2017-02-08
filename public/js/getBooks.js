var IndexLib = {};

IndexLib.returnIndex = (function(){

    var books=[],
        retrievedBook=[],
        count,
        retFlag=false,
        inFlag=false;
    
    function returnBookList(){
        if(window.location.pathname==='/'){
            //GET BOOKS
            console.log("Hello im in index");
            const bodySection = document.getElementById('bodySection');
            bodySection.insertAdjacentHTML('beforeend','<div class="loadme"><div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div></div>')
            if(books.length===0){
                //showLoadPage();
                initialGet(); // INITIALIZE BOOKS ARRAY
            }else{
                retrievedBooks=[]; // EVERTIME YOU HIT THE HOME PAGE SET EMPTY THE RETRIEVE BOOKS
                insertUpperPart(); //INSERT THE UPPER PART
                insertBooks(books); //THEN INSERT THE BOOKS
                listener(); //THEN ASSIGN LISTENERS
            }          
        }
    }

   
    function initialGet(){
        $.ajax({    //GET BOOKS USING AJAX
            type: 'GET',
            url: 'api/v1/Book'
        }).done(function(r){
            books = r; //INITIALIZE BOOKS
            retrievedBooks=[]; //SET RETRIVEBOOKS TO ZERO. BE CONSISTENT
            count = r.length; //SET COUNT TO NUMBER OF BOOKS
            insertUpperPart(); //INSERT UPPER PART
            insertBooks(books); //INSERT BOOKS
            listener(); //ASSIGN LISTENERS
            // $('#loaderBody').fakeLoader({bgColor:"#ffff00",show:false});
            // $("#loaderBody").remove();
        });
    }



    function insertUpperPart(){
        $('#bodySection').html(''); //CLEAR BODY SECTION CONTENT
        
            const bodySection = document.getElementById('bodySection'); //GET BODY SECTION
            bodySection.insertAdjacentHTML('beforeend',     //THEN INSERT THIS TO BODYSECTION
                `
                <div class="columns"> <div class="column is-two-thirds center"> <div class="content"> <h4 align="justify"> "Never before have I felt so empowered to learn as I do today. When I was young, there were few options to learn on my own. My parents had a set of World Book Encyclopedias, which I read through in alphabetical order. But there were no online courses, video lectures, or podcasts to introduce me to new ideas and thinkers as we have today. Still, reading books is my favorite way to learn about a new topic. I’ve been reading about a book a week on average since I was a kid. Even when my schedule is out of control, I carve out a lot of time for reading. If you’re looking for a book to enjoy over the holidays, here are some of my favorites from this year. They cover an eclectic mix of topics—from tennis to tennis shoes, genomics to great leadership. They’re all very well written, and they all dropped me down a rabbit hole of unexpected insights and pleasures." </h4> </div></div></div><section class="hero"> <div class="hero-body"> <p align="center" class="title is-2">Favorite Books</p><div class="column is-one-quarter center"> <div class="content"> <h4 align="center">"Read and find ways to deliver the knowledge people need to live healthier lives and climb out of poverty."</h4> </div></div>
                <div id="afterHeading">
                <div class="columns"> <div class="column is-one-third center"> <div class="nav-wrapper"> <form id="searchForm"> <div class="input-field"> <input id="search" type="search" required=""/> <label for="search" class="label-icon"><i class="fa fa-search fsearch"></i></label></div></form> </div></div></div><div class="spacer"> <section class="hero"> <div class="hero-body"> <div class="container"></div></div></section> </div><div class="columns"> <div class="column is-two-thirds center"> <div id="sortDate" class="column"> <div class="is-left"><span id="count" class="title is-4 has-text-muted">${count} books</span> <span class="title is-3 has-text-muted">&nbsp;|&nbsp;</span> <a href="/new" class="button is-primary new-btn">New</a></div><div class="ul rightUl"><li id="getAll" class="link"><a href=""><span class="icon"><i class="fa fa-list"></i></span> <span>All</span></a></li><li id="newest" class="link"><a href=""><span class="icon"><i class="fa fa-heart"></i></span> <span>Newest</span></a></li><li id="oldest" class="link"><a href=""><span class="icon"><i class="fa fa-th"></i></span><span>Oldest</span></a></li></div></div>
                <hr class="hr"/> </div></div><div class="spacer"></div><div class="component"> <ul id="bookList" class="align"></ul> </div></div></section><div>
                `
            );
    }

    function insertBooks(books){
        $('#bookList').html(''); //CLEAR BOOKS LIST CONTENT
        console.log(books)
        const bookList = document.getElementById('bookList'); //GET BOOKLIST LOCATION
        if(books.length!==0){
            books.forEach(function(book){ //INSERT ALL THE BOOKS
                bookList.insertAdjacentHTML('beforeend',
                `
                <li> <figure class="book"> <ul class="hardcover_front"> <li><img src="${book.imageUrl}" alt="" id="imgBook"/><span class="ribbon bestseller">Nº1</span></li><li></li></ul> <ul class="page"> <li></li><li><a class="btn bookButton" id="${book._id}" >View More</a></li><li></li><li></li><li></li></ul> <ul class="hardcover_back"> <li></li><li></li></ul> <ul class="book_spine"> <li></li><li></li></ul> <figcaption id="style-4" class="content scrollbar"> <div class="container conBook"> <h1>${book.title}</h1> <span>${book.author}</span> <p>${book.description}</p></div></figcaption> </figure> </li>
                `
                );
            });
        }else{ //IF NUMBER OF BOOKS PASSED IS 0
             bookList.insertAdjacentHTML('beforeend','<h3>Nothing was found. Please try again</h3>');
        }
    }

    function listener(){ //LISTENER ASSIGNER
        $('a.bookButton').click(function(e){
            console.log($(this).attr("id"));
            pushState($(this).attr("id"));
        });

        $('input[type=search]').keyup(function(e){ //SEARCH INPUT
            console.log("key");
            var flag=true;
            var val = $(this).val();
            startSearch(val); //SEARCH EVERY KEYSTROKE
        
            
        });

        $('#searchForm').on('submit',function(e){ //SUBMIT FORM WHEN YOUR PRESS ENTER
            e.preventDefault();
            if(e.charCode===13){
                e.preventDefault();
            }
            var val = $('input[type=search]').val();
            if(val.length<4){ //CHECK IF INPUT LEN IS LESS THAN 4
                window.alert('Query is to short! HAHAHAH')
                console.log("too short");
            }else{ //IF NOT THEN START SEARCHING
                var keyword = val;
                startSearch(keyword);//START SEARCHING
              
            }
        });

        $('#getAll').click(function(e){
            e.preventDefault();
            console.log("dasdsa");
            returnBookList();
            window.history.pushState({},null,'/');
            listener();
        });

        $('#newest').click(function(e){
            e.preventDefault();
            if(window.location.pathname==='/'){
                if(!inFlag) {
                    books.reverse();
                    inFlag=true;
                }
                insertBooks(books);
            }else{
                if(!retFlag) {
                    retrievedBooks.reverse();
                    retFlag=true;
                }
              
                insertBooks(retrievedBooks);
            }
            listener();
        });

        $('#oldest').click(function(e){
            e.preventDefault();
             if(window.location.pathname==='/'){
                if(inFlag){
                    books.reverse();
                    inFlag=false;
                }
                insertBooks(books);
             }else{
                 if(retFlag){
                    retrievedBooks.reverse();
                    retFlag=false;
                }
                insertBooks(retrievedBooks);
                
             }
             listener();
        });


    }
    //START SEARCHING
    function startSearch(keyword){
        // $.ajax({
        //         type: 'GET',
        //         url: 'api/v1/Book'
        //     }).done(function(r){
               
                //console.log(r);
                //retrievedBooks=r;
                retrievedBooks = searchBook(keyword,books,testBook);
                document.getElementById('count').textContent=retrievedBooks.length+ (retrievedBooks.length>1?' books':' book');
                insertBooks(retrievedBooks);
                listener();
                window.history.pushState({},null,'/books?keyword='+keyword);
            // });
    }

    function testBook(keyword,books){
        var regex = new RegExp(keyword,'i');
        var resultArr=[];
        for(var x=0; x<books.length;x++){
            //console.log(books[x].title)
            if(regex.test(books[x].description)){ //test the title of the book
                 //console.log('match:'+books[x].title)
                 resultArr.push(books[x]); //push if it has a match
            }else{
                continue;//if not continue
            }
        } 
        return resultArr;
    }

    function pushState(id){
        window.history.pushState({content:$('#bodySection').html()},null,'/books/'+id);
        editLib.returnEditBook.returnBook();
    }

    function searchBook(keyword,retrievedBooks,fn){
        console.log('reached')
        var resultArr = fn(keyword,retrievedBooks);
        return resultArr;
    }

    function testIfSearch(pathname){
        var regex = /\/books\?keyword=\w+/;
        return regex.test(pathname)?true:false;
    }

    function testIfEdit(pathname){
        var regex = /\/books\/edit\/\d+\w+/;
        return regex.test(pathname)?true:false;
    }

    function returnOptions(){
        var spinnerOpts;
        return spinnerOpts = {
            
        }
    }
    
    return{
        returnBookList:returnBookList,
        startSearch:startSearch,
        testIfSearch:testIfSearch,
        returnOptions:returnOptions,
        insertUpperPart:insertUpperPart,
        testIfEdit:testIfEdit
    }
}());


IndexLib.returnIndex.returnBookList();
document.getElementById('homeNav').addEventListener('click',function(e){
    e.preventDefault();
    if(window.location.pathname==='/'){
        console.log("youre on homepage")
        e.preventDefault();
        return;
    }
    if(window.location.pathname==='/new'){
        $('#newBook').attr('id', 'bodySection');
        $('#bodySection').html('');
        //const bodySection = document.getElementById('bodySection');
        //bodySection.insertAdjacentHTML('beforeend','<h3>Retrieving Books....</h3>')
    }

    if(IndexLib.returnIndex.testIfEdit(window.location.pathname)){
        $('#newBook').attr('id', 'bodySection');
        $('#bodySection').html('');
        //const bodySection = document.getElementById('bodySection');
        //bodySection.insertAdjacentHTML('beforeend','<h3>Retrieving Books....</h3>')
        
    }
    if(window.location.pathname==='/admin/login'){
        document.getElementById('bodySection').classList=[];
        $('#bodySection').html('');
        //const bodySection = document.getElementById('bodySection');
        //bodySection.insertAdjacentHTML('beforeend','<h3>Retrieving Books....</h3>')
        
    }
    window.history.pushState({},null,'/');
    IndexLib.returnIndex.returnBookList();
});

paceOptions = {
  elements: {
    selectors: ['#bodySection']
  }
}