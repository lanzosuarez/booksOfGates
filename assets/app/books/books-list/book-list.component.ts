import { Component, OnInit, EventEmitter,Output } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'bg-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  @Output() bookSelected = new EventEmitter<Book>();

  
  constructor(private bookService : BookService) { }

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }

  onSelected(book:Book){
    this.bookSelected.emit(book);

  }

}
