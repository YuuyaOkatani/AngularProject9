import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gender } from '../gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/gender'

  getGenders(): Observable<gender[]> {
    return this.http.get<gender[]>(this.url);
  }
}
