import { BookService } from './books/book.service';
import { BookListComponent } from './books/books-list/book-list.component';
import { BookItemComponent } from './books/books-list/book-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
import { BooksComponent } from './books/books.component';
import { AppRouting } from "./app.routing";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BooksComponent,
        BookListComponent,
        BookItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouting
    ],
    providers: [BookService],
    bootstrap: [AppComponent]
})
export class AppModule {

}