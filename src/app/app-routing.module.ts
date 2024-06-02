import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'writers', component: WriterComponent},
  {path: 'books', component: BooksComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
