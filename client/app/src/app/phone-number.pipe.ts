import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  pure: true
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
        return value.replace(/^91(\d{0,10})$/, '91-$1')
;
  }

}
