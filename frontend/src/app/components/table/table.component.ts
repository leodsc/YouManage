import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import Options from 'src/app/classes/Options';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  rowsSelected: any;
  EMPLOYEES_PER_PAGE = 10;
  lines: number[] = Array(10).fill(0);
  columnsName: string[] = Object.values(Options);
  data: any[][] = this.loadData();
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.data.length / this.EMPLOYEES_PER_PAGE);
  pages: number[] = Array(this.totalPages)
    .fill(0)
    .map((_, index) => index + 1);
  totalEmployees: number = this.data.length;
  @Output() totalEmployeesEvent = new EventEmitter<number>();
  @ViewChild('#rowInput') rowInput: any;

  resolution?: number;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sendTotalEmployees();
    this.dataService.listenToWindowWidth();
  }

  sendTotalEmployees() {
    this.totalEmployeesEvent.emit(this.totalEmployees);
  }

  loadData(): any[][] {
    const data = [];
    const SALARIO_MINIMO = 1200;
    const SALARIO_MAXIMO = 15000;
    const CPF_MIN = 35567100946;
    const PHONE_FORMAT = '(##) #########';

    faker.setLocale('pt_BR');
    for (let i = 0; i < 29; i++) {
      data.push([
        faker.name.findName(undefined, undefined),
        'R$ ' + String(faker.finance.amount(SALARIO_MINIMO, SALARIO_MAXIMO)),
        faker.phone.phoneNumber(PHONE_FORMAT),
        faker.internet.email(),
        faker.address.cityName(),
        faker.datatype.number(CPF_MIN),
        faker.commerce.department(),
      ]);
    }
    return data;
  }

  clickAll() {
    this.rowsSelected = 'all';
    // console.log(this.rowInput);
    // this.rowInput.nativeElement.setAttributes('checked');
  }

  randomPhoto(): string {
    return faker.image.people(undefined, undefined, true);
  }
}
