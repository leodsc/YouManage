import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employees: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([new Employee()]);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    Authorization: environment.token,
  });

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

  deleteEmployee(employees: Employee[]): Observable<Employee[]> {
    return this.http.delete<Employee[]>(environment.server + 'employee', {
      headers: { Authorization: environment.token },
      body: employees,
    });
  }
}
