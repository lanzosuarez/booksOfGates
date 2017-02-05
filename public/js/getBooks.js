document.ready = (function(){

    if(window.location.pathname==='/'){
        //GET BOOKS
        console.log("Hello im in index")
        $.ajax({
            type: 'GET',
            url: 'api/v1/Book'
        }).done(function(r){
            console.log(r);
            const bookList = document.getElementById('bookList');
            const books = r;
            books.forEach(function(book){
                bookList.insertAdjacentHTML('beforeend',
                `<li>
                    <figure class="book">
                        <ul class="hardcover_front">
                        <li><img src="${book.imageUrl}" alt="" id="imgBook"/><span class="ribbon bestseller">Nº1</span></li>
                        <li></li>
                        </ul>
                        <!-- Pages-->
                        <ul class="page">
                        <li></li>
                        <li><a href="/books/${book._id}" class="btn">View More</a></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        </ul>
                        <!-- Back-->
                        <ul class="hardcover_back">
                        <li></li>
                        <li></li>
                        </ul>
                        <ul class="book_spine">
                        <li></li>
                        <li></li>
                        </ul>
                        <figcaption id="style-4" class="content scrollbar">
                        <div class="container conBook">
                            <h1>${book.title}</h1>
                            <span>${book.author}</span>
                            <p>${book.description}</p>
                        </div>
                        </figcaption>
                    </figure>
                </li>`
                );
            })
        });  
    }
}());