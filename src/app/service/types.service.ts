import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type } from '../type';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/types'

  getTypes() : Observable<type[]>{
    return this.http.get<type[]>(this.url);
  }
}
