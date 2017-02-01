import { Routes, RouterModule } from "@angular/router";

import { BooksComponent } from "./books/books.component";
import { BOOKS_ROUTES } from './books/book.routes';

const APP_ROUTES: Routes = [
    
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'books', component: BooksComponent, children: BOOKS_ROUTES },//bg-book-list
];

export const AppRouting = RouterModule.forRoot(APP_ROUTES);