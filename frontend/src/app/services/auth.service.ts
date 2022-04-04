import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from '../models/Manager';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(manager: Manager): Observable<any> {
    return this.http.post('http://localhost:8080/manager/login', manager);
  }
}
