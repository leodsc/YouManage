import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from '../models/Manager';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(manager: Manager): Observable<Manager> {
    return this.http.post('http://localhost:8080/manager/login', manager);
  }

  create(manager: Manager): Observable<string> {
    return this.http.post('http://localhost:8080/manager/create', manager, {
      responseType: 'text',
    });
  }
}
