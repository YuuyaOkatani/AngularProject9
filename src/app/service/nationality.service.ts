import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nationality } from '../nationality';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/nationality'

  getNationalities(): Observable<nationality[]>{
    return this.http.get<nationality[]>(this.url);
  }
}
