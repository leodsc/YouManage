import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/service/employee.service';

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

  addEmployee() {
    this.employeeService.create(this.employee).subscribe(
      (resp: Employee) => {
        this.employee = resp;
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
