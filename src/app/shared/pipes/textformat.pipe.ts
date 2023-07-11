import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textformat'
})
export class TextformatPipe implements PipeTransform {

  transform(value:string, format:string): string {
    if(!value){
    return value;
  }
  switch(format) {
    case 'uppercase': return value.toUpperCase();
    case 'lowercase': return value.toLocaleLowerCase();
    case 'titlecase': return this.toTitleCase(value);
    default: return value
  }
  
  }
  private toTitleCase(value: string): string {
    return value.replace(/\b\w/g, match => match.toUpperCase());
  }

}
