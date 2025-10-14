import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[] = [];
  errorMessage = '';
  userInput = new FormControl<string>('');
  subs: Subscription[] = [];

  
  newProduct = { title: '', description: '', category: '' };
  editProductId: number | null = null;
  editData = { title: '', description: '', category: '' };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
   
    this.fetchProducts();

    
    this.subs.push(
      this.productService.products$.subscribe(list => {
        this.products = list;
      })
    );

    
    this.subs.push(
      this.userInput.valueChanges.pipe(
        debounceTime(1000),
        switchMap(input => this.productService.searchProduct(input || ''))
      ).subscribe({
        next: result => {
          
          console.log('Search result:', result);
        },
        error: err => {
          console.error('Error in search:', err);
          this.errorMessage = 'Failed to fetch search results.';
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  
  fetchProducts(): void {
    this.subs.push(
      this.productService.getProducts().subscribe({
        next: (response: any[]) => {
          
          console.log('API Response:', response);
          this.products = response;
        },
        error: err => {
          console.error('Error fetching products:', err);
          this.errorMessage = 'Failed to load products.';
        }
      })
    );
  }

 
  addProduct(): void {
    if (!this.newProduct.title.trim()) return;
    this.productService.addProduct(this.newProduct);
    this.newProduct = { title: '', description: '', category: '' };
  }

  editProduct(p: any): void {
    this.editProductId = p.id;
    this.editData = { title: p.title ?? '', description: p.description ?? '', category: p.category ?? '' };
  }

  saveEdit(): void {
    if (this.editProductId == null) return;
    this.productService.updateProduct(this.editProductId, this.editData);
    this.editProductId = null;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
  }
}
