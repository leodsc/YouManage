import { Component, OnInit } from '@angular/core';
import Label from 'src/app/classes/Label';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  inputs: Label[] = [
    new Label(
      'Nome',
      'name',
      'assets/help-circle.svg',
      'Insira aqui o nome do gerente.'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
