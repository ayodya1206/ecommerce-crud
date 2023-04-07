import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(
    private _domSanitizer: DomSanitizer
  ) {

  }
  transform(url: any): unknown {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
