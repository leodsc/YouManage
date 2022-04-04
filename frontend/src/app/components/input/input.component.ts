import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Manager } from 'src/app/models/Manager';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() content: any;
  @Output() modelEmitter = new EventEmitter<string>();
  modelProperty: any;
  showInfo: boolean = false;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('click', (e: any) => {
      let isClickOnIcon = e.target.tagName === 'IMG';
      if (this.showInfo && !isClickOnIcon) {
        this.showInfo = false;
        environment.currentIconOpen = '';
      }
    });
  }

  sendContent($event: any) {
    this.modelEmitter.emit();
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
}
