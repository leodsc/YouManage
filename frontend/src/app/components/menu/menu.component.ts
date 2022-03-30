import { Component, OnInit, ViewChild } from '@angular/core';
import Options from 'src/app/classes/Options';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu(event: any) {
    this.menuOpen = !this.menuOpen;
    const children = event.currentTarget.children;
    [...children].forEach((child, index) => {
      index !== 1
        ? child.classList.toggle('line-animation-' + index)
        : child.classList.toggle('hide');
    });
  }
}
