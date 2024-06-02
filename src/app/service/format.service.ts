import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { format } from '../format';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/formats'

  getFormat(): Observable<format[]>{
    return this.http.get<format[]>(this.url);

  }
}
