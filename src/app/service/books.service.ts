import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { books } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/books'

  getBooks(): Observable<books[]>{
    return this.http.get<books[]>(this.url);
  }

  getBook(book: books): Observable<books>{
    return this.http.get<books>(`${this.url}/${book.id}`);
  }

  addBooks(book: books): Observable<books>{
    return this.http.post<books>(this.url, book);

  }

  deleteBooks(book: books): Observable<books>{
    return this.http.delete<books>(`${this.url}/${book.id}`);
  }

  updateBooks(book: books): Observable<books>{
    return this.http.put<books>(`${this.url}/${book.id}`, book);
  }

}
