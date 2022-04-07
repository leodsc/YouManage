import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {
    const name = this.name.split(' ');
    this.name = name[0][0] + name[1][0];
  }

  randomColor(): string {
    const [red, green, blue] = [this.random(), this.random(), this.random()];
    return `rgb(${red}, ${green}, ${blue})`;
  }

  random(): number {
    return Math.floor(Math.random() * 255);
  }
}
