import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  headers = new HttpHeaders({
    Authorization: environment.token,
  });

  constructor(private http: HttpClient) {}

  deleteEmployee(employees: Employee[]): Observable<string[]> {
    return this.http.delete<string[]>(environment.server + 'delete/employee', {
      headers: this.headers,
      body: employees,
    });
  }
}
