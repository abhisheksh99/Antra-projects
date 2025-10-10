import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPipe } from './custom.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from './title/title.component';
import { SectionComponent } from './section/section.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,

    TaskDetailComponent,
    TaskListComponent,
    CustomPipe,
    ProductsComponent,



    TitleComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
