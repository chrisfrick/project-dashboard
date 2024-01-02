import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameToInitial',
})
export class NameToInitialPipe implements PipeTransform {
  transform(value: string): string {
    return `${value.slice(0, 1)}.`;
  }
}
