import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { Manager } from 'src/app/models/Manager';
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
    private managerService: ManagerService
  ) {}

  menuOpen: boolean = false;
  resolution: number = environment.resolution;
  totalEmployees?: number;
  showModal: boolean = false;
  listOfEmployeesToDelete: Employee[] = [];

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/'], {
        queryParams: { error: 'authentication' },
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

  receiveEmployeeToDelete($event: any) {
    if ($event.checked) {
      const employee = new Employee();
      employee.id = $event.id;
      employee.manager = new Manager();
      employee.manager.id = environment.id;
      this.listOfEmployeesToDelete.push(employee);
    } else {
      let i = 0;
      for (let employee of this.listOfEmployeesToDelete) {
        if (employee.id == $event.id) {
          this.listOfEmployeesToDelete.splice(i, 1);
          break;
        }
        i++;
      }
    }
  }

  deleteEmployee() {
    this.managerService
      .deleteEmployee(this.listOfEmployeesToDelete)
      .subscribe((resp: string[]) => {
        alert(`${[...resp]}`);
      });
  }
}
