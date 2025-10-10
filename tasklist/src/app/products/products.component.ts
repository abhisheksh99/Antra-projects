import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { FormControl, FormGroup } from '@angular/forms';
import { concatMap, debounceTime, of, Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy{
  productsList?:any = [];
  errorMessage:string = "";
  addingProduct:boolean = false;

  newTitle:string = '';
  newDescription:string = '';
  newCategory:string = '';

  editingIndex: number | null = null;
  userSearchInput= new FormControl();

  subscriptions:Subscription[] = [];

  constructor(private productService: ProductService){

  }

  ngOnInit():void {
    this.subscriptions.push(this.productService.getProducts().subscribe({
      next: (data:any) => {
        console.log('Data:', data)
        this.productsList = data.products;
      },
      error: (err) => {
        console.error('Error:', err)
        this.errorMessage = 'Error: '+err.message;
      },
      complete: () => console.log('Completed')
    }));
    console.log(this.userSearchInput);

    this.subscriptions.push(this.userSearchInput.valueChanges.pipe(
      debounceTime(500),
      switchMap((input) => {
        return this.productService.getSearchedProducts(input);
        })).subscribe({
            next: (data:any) => {
            console.log(data);
          }
      }
    ));

    this.subscriptions.push(this.productService.products.subscribe(res => this.productsList = res));
  }


  addProduct() {
    this.addingProduct = true;
  }

  onSubmitAddProduct() {
    if(!this.newTitle || !this.newDescription || !this.newCategory) {
      alert('You must fill out all fields');
    }

    const newProduct = {
      title: this.newTitle,
      description: this.newDescription,
      category: this.newCategory
    }

    this.productsList.push(newProduct);
  }

  onCancelAddProduct() {
    this.addingProduct = false;
  }

  onUpdate(productIndex:number) {
    this.editingIndex = productIndex;
    console.log(this.editingIndex);
  }

  updateProduct(productIndex:number) {
    if(!this.newTitle || !this.newDescription || !this.newCategory) {
      alert('You must fill out all fields');
    }
    const product = this.productsList[productIndex];
    product.title = this.newTitle;
    product.description = this.newDescription;
    product.category = this.newCategory;

    this.newTitle = '';
    this.newDescription = '';
    this.newCategory = '';
    this.editingIndex = null;
  }

  closeEditing() {
    this.editingIndex = null;
  }

  onDelete(index:number) {
    this.productsList.splice(index,1);
  }

  ngOnDestroy():void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
