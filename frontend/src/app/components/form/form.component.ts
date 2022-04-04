import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Label from 'src/app/classes/Label';
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
  showInfo: boolean = false;
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
    window.addEventListener('click', (e: any) => {
      let isClickOnIcon = e.target.tagName === 'IMG';
      if (this.showInfo && !isClickOnIcon) {
        this.showInfo = false;
        environment.currentIconOpen = '';
      }
    });
  }

  show(state: boolean) {
    this.showInfo = state;
  }

  showIconInfo(): void {
    const closeThisInputInfo = environment.currentIconOpen === this;
    const closeAnotherInputInfo = environment.currentIconOpen != '';

    if (closeThisInputInfo) {
      environment.currentIconOpen = '';
      this.show(false);
    } else {
      if (closeAnotherInputInfo) {
        environment.currentIconOpen.show(false);
      }
      // open a new input info if there isnt any input info opened
      this.show(true);
      environment.currentIconOpen = this;
    }
  }

  login() {
    this.auth.login(this.manager).subscribe((resp: Manager) => {
      this.manager = resp;
      this.router.navigate(['/home']);
    });
  }
}
