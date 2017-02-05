document.ready=(function(){

    if(window.location.pathname==="/books/new"){
        console.log("hello im in new book");
        var location=document.getElementById('newBody');
        location.insertAdjacentHTML('afterBegin',
        `
            <div class="hero-body content">
                <form id="myForm" enctype="multipart/form-data">
                    <div class="container">
                    <div class="section new-header">
                        <div class="container">
                            <div class="columns">
                                <div class="column"><span class="title is-3 is-white">Favorite Books</span>          
                                    <span class="title is-3 has-text-muted">&nbsp;|&nbsp;</span>  
                                    <span class="title is-4 has-text-muted">New Book</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section newBook">
                        <div class="container">
                        <div class="columns">
                            <div class="column is-auto">
                            <div class="container">
                                <div class="photo_submit-container">
                                    <div class="photo_submit-container">
                                        <label class="photo_submit js-photo_submit1">
                                            <input id="newBookImg" type="file" name="bookImage" class="photo_submit-input js-photo_submit-input"/>            
                                            <span class="photo_submit-plus"></span>           
                                            <span class="photo_submit-uploadLabel">Upload photo</span>            
                                            <span class="photo_submit-delete"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="column is-8">
                            <div class="box content boxColor">
                                <input id="imageUrl" type="hidden" name="imageUrl" required="required" class="input"/>
                                <div class="row">
                                <div class="input-field col s12">
                                    <input id="title" type="text" name="title" required="required" class="validate"/>
                                    <label id="titleLabel" for="title">Book Title *</label>
                                </div>
                                </div>
                                <div class="row">
                                <div class="input-field col s12">
                                    <input id="author" type="text" name="author" required="required" class="validate"/>
                                    <label id="authorLabel" for="author">Author *</label>
                                </div>
                                </div>
                                <div class="row">
                                <div class="input-field col s6">
                                    <input id="published" type="date" name="published" required="required" class="datepicker"/>
                                    <label id="publishedLabel" for="published">Year Published *</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="price" type="text" name="price" required="required" class="validate"/>
                                    <label id="priceLabel" for="price">Kindle Price *</label>
                                </div>
                                </div>
                                <div class="row">
                                <div class="input-field col s12">
                                    <input id="link" type="url" name="link" required="required" class="validate"/>
                                    <label id="linkLabel" for="link">Amazon Link *</label>
                                </div>
                                </div>
                                <div class="row">
                                <div class="input-field col s12">
                                    <textarea id="description" name="description" required="required" class="materialize-textarea validate"></textarea>
                                    <label id="descriptionLabel" for="description">Book Description</label>
                                </div>
                                </div>
                                <p class="control">
                                <button id="submitButton" class="button is-primary">Save </button> &nbsp; &nbsp; &nbsp;
                                <button id="back" class="button is-default">Cancel</button>
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            `
        )
    }
}());