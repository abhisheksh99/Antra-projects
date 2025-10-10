import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'https://dummyjson.com/products';
  private searchApiURL = "https://dummyjson.com/products/search?q=";
  products = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get(this.apiURL).pipe(
      tap((data:any) => this.products.next(
        data.products
      ))
    );
  }

  getSearchedProducts(keyword:string) {
    return this.http.get(this.searchApiURL+keyword).pipe(
      tap((data:any) => this.products.next(
        data.products
      )
    ));
  }

}
