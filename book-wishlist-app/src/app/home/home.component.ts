import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  booksList: any[] = [];
  userSearchInput = new FormControl<string>('');
  subscriptions: Subscription[] = [];
  errorMessage = '';
  selectedCardIndex = 0;
  addedBooks: any[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject to update the list
    this.bookService.books.subscribe(res => this.booksList = res);

    // Search input changes
    this.userSearchInput.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(input => {
      if (!input || input.trim().length === 0) {
        this.booksList = [];
        return;
      }

      // Perform search
      this.bookService.getBooks(input).subscribe();
    });

    // initial load
    this.bookService.getBooks('bookName').subscribe();
  }

  onSelectCard(book:any) {
    if (!this.addedBooks.includes(book)) {
      this.addedBooks.push(book);
    }
  }

  onDelete(index:number) {
    this.addedBooks.splice(index,1);
  }
}
