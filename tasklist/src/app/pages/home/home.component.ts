
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  books: any[] = [];
  wishlist: any[] = [];
  subs: Subscription[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    const sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(query => this.bookService.searchBooks(query || ''))
      )
      .subscribe({
        next: res => {
          this.books = res.items || [];
          this.wishlist = this.bookService.getWishlist();
        },
        error: err => console.error('API error', err)
      });

    this.subs.push(sub);
    this.wishlist = this.bookService.getWishlist();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  addToWishlist(book: any) {
    this.bookService.addToWishlist({
      id: book.id,
      title: book.volumeInfo.title
    });
    this.wishlist = this.bookService.getWishlist();
  }

  remove(id: string) {
    this.bookService.removeFromWishlist(id);
    this.wishlist = this.bookService.getWishlist();
  }
}
