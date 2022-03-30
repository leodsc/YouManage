import { Component, OnInit, ViewChild } from '@angular/core';
import Options from 'src/app/classes/Options';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  menuOpen: boolean = true;
  @ViewChild('selection') select: any;
  valueSelected: string = ' Nome';
  options: any = {
    selections: Object.values(Options),
    values: Object.keys(Options),
  };

  constructor() {}

  ngOnInit(): void {}

  changeSelection(): void {
    const optionSelected =
      this.select.nativeElement.selectedOptions[0].innerText;
    this.valueSelected = optionSelected;
  }
}
