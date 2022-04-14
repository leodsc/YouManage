import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  Directive,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import { Employee } from 'src/app/models/Employee';
import { Manager } from 'src/app/models/Manager';
import { EmployeeService } from 'src/app/service/employee.service';
import { environment } from 'src/environments/environment.prod';
import '../../declarations/date.extensions';
import { fixDate } from 'src/app/app.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() content: any;
  @Output() closeModalEvent = new EventEmitter<string>();
  @Output() refreshEmployeesEvent = new EventEmitter<Employee>();
  employee = new Employee();
  cpfNumbers: number;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  getAllEmployees() {
    this.employeeService.getAll().subscribe((resp: Employee[]) => {
      // this.refreshEmployeesEvent.emit(resp);
    });
  }

  formatCpf($event: any) {
    const key = $event.key;
    let inputValue = $event.target.value;
    const isNumber = !isNaN(Number(key));
    if (isNumber) {
      if (inputValue.length == 2 || inputValue.length == 6) {
        $event.target.value = inputValue + key + '.';
      } else if (inputValue.length == 10) {
        $event.target.value = inputValue + key + '-';
      }
    }
  }

  checkNullData(): boolean {
    return (
      this.employee.name === undefined ||
      this.employee.email === undefined ||
      this.employee.salary === undefined ||
      this.employee.department === undefined ||
      this.employee.hiringDate === undefined
    );
  }

  addEmployee() {
    // this.loadFakeData();
    if (this.checkNullData()) {
      alert(
        'Os campos abaixo não podem ficar em branco!\nNome\nEmail\nSalário\nDepartamento\nData de contratação'
      );
    } else {
      this.employee.manager.id = environment.id;
      this.employee.manager.name = environment.name;
      this.employeeService.create(this.employee).subscribe(
        (resp: Employee) => {
          const employeesArray = this.employeeService.employees.value;
          resp.hiringDate = fixDate(resp.hiringDate);
          employeesArray.push(resp);
          console.log(resp.manager);
          this.employeeService.employees.next(employeesArray);
          this.sendModalStatus('Funcionário adicionado com sucesso!');
        },
        (error) => {
          console.log(error.status);
          this.sendModalStatus('Ocorreu um erro!');
        }
      );
    }
  }

  loadFakeData() {
    //tests
    const SALARIO_MINIMO = 1200;
    const SALARIO_MAXIMO = 15000;

    faker.setLocale('pt_BR');
    this.employee.name = faker.name.findName(undefined, undefined);
    this.employee.salary = Number(
      faker.finance.amount(SALARIO_MINIMO, SALARIO_MAXIMO)
    );
    this.employee.hiringDate = faker.date.recent();
    this.employee.department = faker.company.bsNoun();
    this.employee.email = faker.internet.email();
    this.employee.birthday = faker.date.past(30);
    this.employee.phone = 938493893;
    this.employee.manager = new Manager();
    this.employee.manager.id = environment.id;
    this.employee.manager.name = environment.name;
    console.log(this.employee);
  }

  sendModalStatus(message?: string) {
    this.closeModalEvent.emit(message);
  }
}
