import { Component, Input, OnInit } from '@angular/core';
import Label from 'src/app/classes/Label';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() data?: Label[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
