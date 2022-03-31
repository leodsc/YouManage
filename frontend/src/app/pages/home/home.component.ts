import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  totalEmployees?: number;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  receiveTotalEmployees($event: any) {
    this.totalEmployees = $event;
  }
}
