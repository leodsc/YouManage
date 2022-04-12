import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Employee } from 'src/app/models/Employee';
import { Manager } from 'src/app/models/Manager';
import { EmployeeService } from 'src/app/service/employee.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() content: any;
  @Output() closeModalEvent = new EventEmitter<string>();
  employee = new Employee();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  getAllEmployees() {
    this.employeeService.getAll().subscribe((resp: Employee[]) => {
      //
    });
  }

  addEmployee() {
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
    this.employee.manager = new Manager();
    this.employee.manager.id = environment.id;
    console.log(environment.token);
    this.employeeService.create(this.employee).subscribe(
      (resp: Employee) => {
        this.employee = resp;
        this.getAllEmployees();
        this.sendModalStatus('Funcionário adicionado com sucesso!');
      },
      (error) => {
        console.log(error.status);
        this.sendModalStatus('Ocorreu um erro!');
      }
    );
  }

  sendModalStatus(message?: string) {
    this.closeModalEvent.emit(message);
  }
}
