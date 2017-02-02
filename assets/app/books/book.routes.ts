import { BooksComponent } from './books.component';
import { BookDetailComponent } from './books-detail/book-detail.component';
import { BookListComponent } from './books-list/book-list.component';
import { Routes } from '@angular/router';

export const BOOKS_ROUTES: Routes = [
    {path: '', component: BookListComponent},
    {path: ':id', component: BookDetailComponent},
]
