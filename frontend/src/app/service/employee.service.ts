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

  create(employee: Employee): Observable<Employee> {
    return this.http.post(environment.server + 'employee/create', employee, {
      headers: {
        Authorization:
          'dGVzdGU6JDJhJDEwJHZXcy96aWtnM1FXeUdKc1ZCOEtoZ09ndTFSZ3VGWk9xYjhCZVpOdVY4YUF4NUpDSHM4ZHJp',
      },
    });
  }
}
