import { BooksComponent } from './books.component';
import { BookItemComponent } from './books-list/book-item.component';
import { BookListComponent } from './books-list/book-list.component';
import { Routes } from '@angular/router';

export const BOOKS_ROUTES: Routes = [
    {path: '', component: BookListComponent},
    { path: '/:id', component: BookItemComponent},
]
