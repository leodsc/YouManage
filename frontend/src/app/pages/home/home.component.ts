import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { Manager } from 'src/app/models/Manager';
import { EmployeeService } from 'src/app/service/employee.service';
import { ManagerService } from 'src/app/service/manager.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  menuOpen: boolean = false;
  resolution: number = environment.resolution;
  showModal: boolean = false;

  totalEmployees?: number;
  listOfEmployeesToDelete: Employee[] = [];

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/'], {
        queryParams: { error: 'authentication' },
      });
    } else {
      this.employeeService.employees.subscribe((resp: Employee[]) => {
        this.totalEmployees = resp.length;
      });
    }
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  receiveTotalEmployees($event: any) {
    this.totalEmployees = $event;
  }

  toggleSearch() {
    this.menuOpen = !this.menuOpen;
  }

  receiveModal(message: string) {
    // this.changeMessage(message);
    this.showModal = false;
  }

  modal() {
    this.showModal = true;
  }

  logout() {
    this.router.navigate(['/'], { queryParams: { info: 'logout' } });
  }

  receiveEmployeeToDelete($inputEvent: any) {
    if ($inputEvent.checked) {
      const employee = new Employee();
      employee.id = $inputEvent.id;
      employee.manager = new Manager();
      employee.manager.id = environment.id;
      employee.name = $inputEvent.name;
      this.listOfEmployeesToDelete.push(employee);
    } else {
      let i = 0;
      for (let employee of this.listOfEmployeesToDelete) {
        if (employee.id == $inputEvent.id) {
          this.listOfEmployeesToDelete.splice(i, 1);
          break;
        }
        i++;
      }
    }
  }

  deleteEmployee() {
    if (this.listOfEmployeesToDelete.length !== 0) {
      const names: any = [];
      this.listOfEmployeesToDelete.forEach((employee) => {
        names.push(employee.name);
      });
      this.employeeService
        .deleteEmployee(this.listOfEmployeesToDelete)
        .subscribe((resp: Employee[]) => {
          let i = 0;
          const employees = this.employeeService.employees;
          employees.next(resp);
          alert(
            `Os seguintes funcionários foram deletados:\n${names.join('\n')}`
          );
          this.listOfEmployeesToDelete = [];
        });
    }
  }

  receiveDeleteAllEmployees(deleteAll: boolean) {
    deleteAll
      ? (this.listOfEmployeesToDelete =
          this.employeeService.employees.value.map((employee) => {
            // shallow copy employees
            return { ...employee };
          }))
      : (this.listOfEmployeesToDelete = []);
  }
}
