import { Component } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}

export function fixDate(date: Date): Date {
  // date string new Date("2020-01-01") converts to one day off the input -> 2019-12-31, this method fix this
  const dateArray = String(date).split('-');
  const dateNumber: any = [];
  dateArray.forEach((char) => {
    dateNumber.push(Number(char));
  });
  console.log(dateNumber);
  return new Date(dateNumber[0], dateNumber[1] - 1, dateNumber[2]);
}
