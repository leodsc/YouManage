import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  headers = {
    Authorization: environment.token,
  };

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.server + 'employee', {
      headers: { Authorization: environment.token },
    });
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      environment.server + 'employee/create',
      employee,
      { headers: { Authorization: environment.token } }
    );
  }
}
