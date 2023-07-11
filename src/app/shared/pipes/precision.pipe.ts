import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precision'
})
export class PrecisionPipe implements PipeTransform {

  transform(value:number, precision: number = 2): number {
    return parseFloat(value.toFixed(precision));
  }

}
