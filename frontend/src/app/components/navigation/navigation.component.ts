import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import Options from 'src/app/classes/Options';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @Input() menuOpen: boolean = false;
  @ViewChild('selection') select: any;
  valueSelected: string = ' Nome';
  options: any = {
    selections: Object.values(Options),
    values: Object.keys(Options),
  };
  bigger = ['salário', 'cpf', 'contratação', 'nascimento'];

  constructor() {}

  ngOnInit(): void {}

  getSelectedOption(selector: any) {
    return selector.nativeElement.selectedOptions[0].innerText;
  }

  changeSelection(): void {
    const optionSelected = this.getSelectedOption(this.select);
    this.valueSelected = optionSelected;
  }

  preventUpdatePage($event: any) {
    $event.preventDefault();
  }
}
