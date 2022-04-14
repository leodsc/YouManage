import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import { fixDate } from 'src/app/app.component';
import { Message } from 'src/app/classes/Message';
import Options from 'src/app/classes/Options';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent extends Message implements OnInit {
  showModal: boolean = true;
  modalContent = {
    title: '',
  };
  rowsSelected: any;
  private readonly EMPLOYEES_PER_PAGE = 10;
  lines: number[] = Array(10).fill(0);
  columnsName: string[] = Object.values(Options);
  data: any[][] = [[]];

  currentPage: number = 1;
  totalPages: number = Math.ceil(this.data.length / this.EMPLOYEES_PER_PAGE);
  pages: number[] = Array(this.totalPages)
    .fill(0)
    .map((_, index) => index + 1);

  totalEmployees: number;
  objectKeys = Object.keys;
  objectEntries = Object.entries;
  objectValues = Object.values;
  isClicked: boolean = false;

  allEmployeesSelected: boolean = false;
  employees: Employee[];
  @Output() totalEmployeesEvent = new EventEmitter<number>();
  @ViewChild('selectAllEmployees') selectAllEmployees: any;
  @ViewChildren('rowInput') rowInputs: QueryList<Input>;
  @Output() deleteEmployeeEvent = new EventEmitter<{
    id: number;
    name: string;
    checked: boolean;
  }>();
  @Output() deleteAllEmployeesEvent = new EventEmitter<boolean>();

  constructor(
    private dataService: DataService,
    private employeeService: EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAll().subscribe((resp: Employee[]) => {
      console.log(resp);
      // arrumar bug depois
      resp.forEach((employee) => {
        employee.hiringDate = fixDate(employee.hiringDate);
      });
      this.employees = resp;
      this.totalEmployees = this.employees.length;
      this.employeeService.employees.next(resp);
      this.employeeService.employees.subscribe((resp: Employee[]) => {
        this.employees = resp;
        const input = this.selectAllEmployees.nativeElement;
        if (input.checked) {
          input.checked = false;
        }
      });
    });
  }

  loadData(): any[][] {
    const data = [];
    const SALARIO_MINIMO = 1200;
    const SALARIO_MAXIMO = 15000;
    const CPF_MIN = 35567100946;
    const PHONE_FORMAT = '(##) #########';

    faker.setLocale('pt_BR');
    for (let i = 0; i < 29; i++) {
      const name = faker.name.findName(undefined, undefined);
      data.push([
        name,
        'R$ ' + String(faker.finance.amount(SALARIO_MINIMO, SALARIO_MAXIMO)),
        faker.phone.phoneNumber(PHONE_FORMAT),
        faker.internet.email(name.split(' ')[0], name.split(' ')[1]),
        faker.address.cityName(),
        faker.datatype.number(CPF_MIN),
        faker.commerce.department(),
      ]);
    }
    return data;
  }

  clickAll() {
    this.allEmployeesSelected = !this.allEmployeesSelected;
    this.rowInputs.forEach((input: any) => {
      input.nativeElement.checked = this.allEmployeesSelected;
    });
    this.deleteAllEmployeesEvent.emit(this.allEmployeesSelected);
  }

  randomPhoto(): string {
    return faker.image.people(undefined, undefined, true);
  }

  addNewEmployee() {
    console.log('oi');
    this.modalContent.title = 'Adicionar novo card';
    this.showModal = !this.showModal;
  }

  removeEmployee() {}

  receiveModal(message: string) {
    this.changeMessage(message, 3000);
    this.showModal = false;
  }

  checkEmployee($event: any) {
    const checkbox = $event.target;
    this.deleteEmployeeEvent.emit({
      id: Number(checkbox.id),
      name: checkbox.getAttribute('data-employee-name'),
      checked: checkbox.checked,
    });
  }
}
