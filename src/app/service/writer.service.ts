import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { writer } from '../writer';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/writers'

  getWriters(): Observable<writer[]>{
    return this.http.get<writer[]>(this.url)
    
  }

  getWriter(writer: writer): Observable<writer>{
    return this.http.get<writer>(`${this.url}/${writer.id}`)
  }

  addWriter(writer: writer): Observable<writer>{
    return this.http.post<writer>(this.url, writer)
  }

  updateWriter(writer: writer): Observable<writer>{
    return this.http.put<writer>(`${this.url}/${writer.id}`, writer)
  }

  deleteWriter(writer: writer): Observable<writer>{
    return this.http.delete<writer>(`${this.url}/${writer.id}`)
  }

  
}
