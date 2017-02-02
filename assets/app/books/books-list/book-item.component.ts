import { Component, OnInit, Input } from '@angular/core';

import { Book } from '../book';

@Component({
  selector: 'bg-book-item',
  templateUrl: './book-item.component.html',
  styles: [`
  .bookWidth{
      min-height: 300px;
      display: inline-block;
      vertical-align: top;
  }
`]
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  
  constructor() { }

  ngOnInit() {
  }

}
