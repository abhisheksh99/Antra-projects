import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private wishlist: any[] = [];

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlist = JSON.parse(stored);
    }
  }

  searchBooks(query: string): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}${query}`);
  }

  addToWishlist(book: any) {
    const exists = this.wishlist.find(b => b.id === book.id);
    if (!exists) {
      this.wishlist.push(book);
      this.saveWishlist();
    }
  }

  getWishlist() {
    return this.wishlist;
  }

  removeFromWishlist(id: string) {
    this.wishlist = this.wishlist.filter(b => b.id !== id);
    this.saveWishlist(); 
  }

  private saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}
