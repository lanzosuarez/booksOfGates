import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../book';

@Component({
  selector: 'bg-book-item',
  templateUrl: './book-item.component.html',
  
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Input() bookId:number;
  
  constructor() { }

  ngOnInit() {
  }

}
