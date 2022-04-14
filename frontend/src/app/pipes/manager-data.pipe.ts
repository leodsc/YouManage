import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'managerData',
})
export class ManagerDataPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    if (value === null) {
      return '';
    } else if (value.name === undefined) {
      return value;
    }
    return value.name;
  }
}
