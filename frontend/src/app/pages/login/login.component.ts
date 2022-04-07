import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Label from 'src/app/classes/Label';
import { Message } from 'src/app/classes/Message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // inputs: Label[] = [
  //   new Label(
  //     'Nome',
  //     'name',
  //     'assets/help-circle.svg',
  //     'Insira aqui o nome do gerente.'
  //   ),
  // ];
  message = new Message();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.forEach((query) => {
    //   if (query['error'] === 'authentication') {
    //     this.message =
    //       'Você precisa entrar na sua conta antes de acessar os dados dos funcionários!';
    //   } else if (query['info'] === 'logout') {
    //     this.message = 'Você foi desconectado!';
    //   }
    // });
  }

  receiveMessage(message: Message) {
    this.message = message;
    message.toggleTimeout();
  }
}
