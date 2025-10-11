import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
  books = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient) { }


  getBooks(bookName: string) {
    return this.http.get<any>(this.apiURL + bookName).pipe(
      tap((data) => this.books.next(data.items || []))
    );
  }
}
