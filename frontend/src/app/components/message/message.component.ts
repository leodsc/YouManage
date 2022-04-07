import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/classes/MessageColors';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  timeout: any;
  message: string;
  color: Colors;
  time: number;

  constructor() {}

  ngOnInit(): void {}

  changeMessage(message: string, time: number, color: Colors) {
    this.color = color;
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
    this.message = message;
    this.timeout = setTimeout(() => {
      this.message = '';
    }, time);
  }

  set(message: string, time: number, color: Colors) {
    this.message = message;
    this.time;
    this.color = color;
  }
}
