import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
})
export class DateTransformPipe extends DatePipe implements PipeTransform {
  override transform(value: any, ...args: any[]): any {
    if (
      (value !== null && args[0] === 'birthday') ||
      args[0] === 'hiringDate'
    ) {
      console.log('oi');
      return super.transform(new Date(value), 'dd/MM/yyyy');
    }
    return value;
  }
}
