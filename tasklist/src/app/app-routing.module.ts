import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FormComponent } from './form/form.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'', redirectTo: 'form', pathMatch: 'full'},
  {path:'form', component : FormComponent},
  {path:'products', component : ProductsComponent},
  {path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
