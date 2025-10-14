import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  
wishlist: any[]=[];

constructor(private bookService: BookService){}

ngOnInit(): void {
  this.loadWishlist();
}

loadWishlist(){
  this.wishlist=this.bookService.getWishlist();
}

remove(id: string){
  this.bookService.removeFromWishlist(id);
  this.loadWishlist();
}
}
