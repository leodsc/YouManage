import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Label from 'src/app/classes/Label';
import { Message } from 'src/app/classes/Message';
import { Colors } from 'src/app/classes/MessageColors';

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
  public message = Message;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.forEach((query) => {
      if (query['error'] === 'authentication') {
        Message.setProperties(
          'Você precisa entrar na sua conta antes de acessar os dados dos funcionários!',
          6000,
          Colors.DANGER
        );
      } else if (query['info'] === 'logout') {
        Message.setProperties(
          'Você saiu com sucesso da conta!',
          4000,
          Colors.SUCCESS
        );
      }
      Message.toggleTimeout();
    });
  }

  receiveMessage() {
    Message.toggleTimeout();
  }
}
