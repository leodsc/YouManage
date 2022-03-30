import { Component, Input, OnInit } from '@angular/core';
import Label from 'src/app/classes/Label';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() data?: Label[];
  info: string =
    'O nome do gerente cadastrado na plataforma, caso não exista, crie um.';
  showInfo: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  showIconInfo(): void {
    this.showInfo = !this.showInfo;
  }
}
