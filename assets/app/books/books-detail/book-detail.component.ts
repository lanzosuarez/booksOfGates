import { Component, OnInit, Input } from '@angular/core';

import { Book } from "../book";
@Component({
  selector: 'bg-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
  @Input() selectedBook: Book;
  constructor() { }

  ngOnInit() {
  }

}
