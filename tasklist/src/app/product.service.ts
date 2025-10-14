import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';

  private apiUrl2= "https://dummyjson.com/products/search?q="
  
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();


  constructor(private http: HttpClient) { }

  

  searchProduct(keyword: string): Observable<any[]>{
    const query = (keyword ?? '').trim();
    if (!query) return of(this.productsSource.value);

    return this.http.get<any>(this.apiUrl2 + encodeURIComponent(query)).pipe(
      map(res => res.products),
      tap(products=>this.productsSource.next(products)),
      catchError(err =>{
        console.error('Error searching products:', err);
        return of([]);
      })
      
    )

  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res =>res.products),
      tap(products=>this.productsSource.next(products)),
      catchError(err =>{
        console.error('Error fetching products:', err);
        this.productsSource.next([]);
        return of([]);
      })
    );


  }

  addProduct(product: any): void {
    const current = this.productsSource.value;
    const updated = [...current, { id: Date.now(), ...product}]
    this.productsSource.next(updated)
  }

  updateProduct(id: number, product:any): void{
    const updated = this.productsSource.value.map(p=>
      p.id === id? {...p, ...product}: p
    );
    this.productsSource.next(updated)
  }
  deleteProduct(id: number): void{
    const updated = this.productsSource.value.filter(p=> p.id!==id);
    this.productsSource.next(updated);
  }
  setProducts(products: any[]): void {
    this.productsSource.next(products?? []);
  }
  }