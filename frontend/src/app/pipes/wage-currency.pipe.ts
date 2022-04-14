import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wageCurrency',
})
export class WageCurrencyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    if (args[0] === 'salary') {
      return `R$ ${value}`;
    }
    return value;
  }
}
