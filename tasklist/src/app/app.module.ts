import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { TaskdetailComponent } from './tasklist/taskdetail/taskdetail.component';
import { StatusFilterPipe } from './tasklist/status-filter.pipe';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { TitlecolorComponent } from './titlecolor/titlecolor.component';
import { SectionsComponent } from './titlecolor/sections/sections.component';
import { HomeComponent } from './pages/home/home.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    HighlightDirective,
    TaskdetailComponent,
    StatusFilterPipe,
    ProductsComponent,
    TitlecolorComponent,
    SectionsComponent,
    HomeComponent,
    WishlistComponent,
    FormComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
