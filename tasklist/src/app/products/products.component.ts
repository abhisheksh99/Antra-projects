import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage = '';

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        console.log('Fetched Products:', this.products);
      },
      error: (err) => {
        this.errorMessage = `Error: ${err.message}`;
        console.error(err);
      },
      complete: () => console.log('Fetch completed'),
    });
  }

  addProduct(): void {
    const newProduct = {
      title: 'New Product',
      description: 'A test product',
      category: 'electronics',
    };

    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        console.log('Added Product:', response);
        this.loadProducts();
      },
      error: (err) => {
        this.errorMessage = `Error: ${err.message}`;
        console.error(err);
      },
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Deleted Product with ID:', id);
        this.products = this.products.filter(p => p.id !== id);
      },
      error: (err) => {
        this.errorMessage = `Error: ${err.message}`;
        console.error(err);
      },
    });
  }
}
