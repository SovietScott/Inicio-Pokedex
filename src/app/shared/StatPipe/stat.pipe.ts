import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stat'
})
export class StatPipe implements PipeTransform {
  protected readonly maxStat: number = 255;

  transform(value : number, max?: string): string {
    if (max) {
      return String(100 - Number(((value / 255) * 100).toFixed(2))) + '%';
    }else{
      return ((value / 255) * 100).toFixed(2) + '%';
    }
  }

}
