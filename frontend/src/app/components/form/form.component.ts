import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Label from 'src/app/classes/Label';
import { Message } from 'src/app/classes/Message';
import { Colors } from 'src/app/classes/MessageColors';
import { Manager } from 'src/app/models/Manager';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  manager: Manager = new Manager();
  @Output() messageEvent = new EventEmitter();
  // showInfo: string = '';
  // TODO: refatorar para receber do pai
  data: Label[] = [
    new Label(
      'Nome',
      'username',
      '/assets/help-circle.svg',
      'Nome de usuário do gerente',
      'O nome do gerente cadastrado na plataforma, caso não exista, crie um.',
      'text',
      this.manager.name
    ),
    new Label(
      'Senha',
      'password',
      '/assets/help-circle.svg',
      'Senha do gerente',
      'Digite aqui a senha do gerente.',
      'password',
      this.manager.password
    ),
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // window.addEventListener('click', (e: any) => {
    //   let isClickOnIcon = e.target.tagName === 'IMG';
    //   if (this.showInfo && !isClickOnIcon) {
    //     this.showInfo = '';
    //     environment.currentIconOpen = '';
    //   }
    // });
  }

  // show(state: boolean) {
  //   this.showInfo = state;
  // }

  showIconInfo(): void {
    // const closeThisInputInfo = environment.currentIconOpen === this;
    // const closeAnotherInputInfo = environment.currentIconOpen != '';
    // if (closeThisInputInfo) {
    //   environment.currentIconOpen = '';
    //   this.show(false);
    // } else if (closeAnotherInputInfo) {
    //   environment.currentIconOpen.show(false);
    //   this.showInfo = !this.showInfo;
    //   // open a new input info if there isnt any input info opened
    // } else {
    //   this.showInfo = !this.showInfo;
    //   environment.currentIconOpen = this;
    // }
  }

  login = () => {
    this.auth.login(this.manager).subscribe(
      (resp: Manager) => {
        this.manager = resp;
        environment.token = resp.token;
        environment.id = resp.id;
        environment.name = resp.name;
        console.log(resp.id);
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.status === 404) {
          Message.setProperties('Gerente não encontrado!', 4000, Colors.DANGER);
          this.messageEvent.emit();
        }
      }
    );
  };

  create = () => {
    this.auth.create(this.manager).subscribe(
      (resp: Manager) => {
        Message.setProperties(
          `Gerente ${resp.name} criado!`,
          5000,
          Colors.SUCCESS
        );
      },
      (error) => {
        if (error.status == 409)
          Message.setProperties('Gerente já existe!', 5000, Colors.DANGER);
      }
    );
    this.messageEvent.emit();
  };
}
